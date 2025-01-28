import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";

import path from "path";
import fs from "fs";

const mock = require("mock-require");
const mockAddJobApplications = require("../../mocks/mockAddJobApplications");
const mockJobPostings = require("../../mocks/mockJobPostings");
const mockS3 = require("../../mocks/mockS3");
const mockValidateRecaptchaToken = require("../../mocks/mockRevalidateRecaptchaToken");

let addJobApplicationRequestHandler;

beforeEach(() => {
  // Mock the JobApplication and JobPosting models
  mock("../../../src/models/job_applications.model", mockAddJobApplications);
  mock("../../../src/models/job_posts.model", mockJobPostings);

  // Mock the S3 upload utility
  mock("../../../src/utils/s3", mockS3);

  // Mock the validateRecaptchaToken function
  mock("../../../src/utils/validateRecaptchaToken", mockValidateRecaptchaToken);

  // Re-require the handler to apply the mocks
  addJobApplicationRequestHandler = mock.reRequire(
    "../../../src/controllers/job_applications/addJobApplication",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_applications.model");
  mock.stop("../../../src/models/job_posts.model");
  mock.stop("../../../src/utils/s3");
});

describe("addJobApplicationRequestHandler test suite", () => {
  const mockRes = {
    status: vi.fn().mockImplementation(function (code) {
      mockRes.statusCode = code;
      return this;
    }),
    json: vi.fn(),
    statusCode: 0,
  };

  afterEach(() => {
    // Reset status and json mocks after each test
    mockRes.status.mockClear();
    mockRes.json.mockClear();
    mockRes.statusCode = 0;
  });

  describe("Validation Behavior", () => {
    it("Returns 400 if a required field is missing", async () => {
      const mockReq = {
        body: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "One or more required fields are missing.",
      });
    });

    it("Returns 400 if application status is invalid", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "InvalidStatus",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid application status provided.",
      });
    });

    it("Returns 400 if status in Canada is invalid", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "InvalidStatus",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid status in Canada provided.",
      });
    });

    it("Returns 400 if postal code is invalid", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "INVALID",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid postal code.",
      });
    });

    it("Returns 400 if phone number is invalid", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "INVALID",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid phone number.",
      });
    });

    it("Returns 400 if email is invalid", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "invalid-email",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid email.",
      });
    });

    it("Returns 400 if statusOther is missing when status in Canada is 'Other'", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Other",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "statusOther attribute needed",
      });
    });

    it("Returns 404 if job posting does not exist", async () => {
      const mockReq = {
        body: {
          job_posting_id: 9999, // Non-existent job posting ID
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token",
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Job posting not found.",
      });
    });
  });

  describe("Validation Behavior", () => {
    it("Returns 400 if a required field is missing", async () => {
      const mockReq = {
        body: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token", // Include a valid token for the test
        },
        file: { buffer: Buffer.from("test"), mimetype: "application/pdf" },
      };

      await addJobApplicationRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "One or more required fields are missing.",
      });
    });
  });

  describe("Successful Behavior", () => {
    let mockFilePath;

    beforeEach(() => {
      // Define the path to the pre-created mock file
      mockFilePath = path.join(
        __dirname,
        "mock-files", // Directory where the mock file is stored
        "mock-file.pdf", // Mock file name
      );

      // Ensure the file exists before running the test
      if (!fs.existsSync(mockFilePath)) {
        throw new Error(`Mock file does not exist: ${mockFilePath}`);
      }
    });

    it("Returns 201 if the application is successfully created using a mock PDF file", async () => {
      const mockReq = {
        body: {
          job_posting_id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          status_in_canada: "Citizen",
          application_status: "New",
          custom_responses: {},
          token: "valid-token", // Ensure valid token for the test
        },
        file: {
          buffer: fs.readFileSync(mockFilePath), // Use the mock file contents
          mimetype: "application/pdf",
        },
      };

      // Perform the test
      await addJobApplicationRequestHandler(mockReq, mockRes);

      // Assert the response status
      expect(mockRes.statusCode).toBe(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Job application created successfully.",
        }),
      );
    });
  });
});

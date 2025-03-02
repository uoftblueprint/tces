import { expect, describe, it, afterEach, beforeEach } from "vitest";

const mock = require("mock-require");
const mockJobPosting = require("../../mocks/mockGetOneJobPost");

let getJobPostRequestHandler;

beforeEach(() => {
  // Mock the JobPosting model
  mock("../../../src/models/job_posts.model", mockJobPosting);

  // Re-require the handler to apply the mock
  getJobPostRequestHandler = mock.reRequire(
    "../../../src/controllers/job_posts/getOneJobPost",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_posts.model");
});

describe("getJobPostRequestHandler test suite", () => {
  const mockRes = {
    status: (code) => {
      mockRes.statusCode = code;
      return {
        json: (message) => {
          mockRes.response = message;
          return mockRes;
        },
      };
    },
    statusCode: 0,
    response: null,
  };

  afterEach(() => {
    // Reset status code and response after each test
    mockRes.statusCode = 0;
    mockRes.response = null;
  });

  describe("GET Job Post by ID", () => {
    it("Returns job post details successfully", async () => {
      const mockReq = {
        method: "GET",
        params: { job_posting_id: 123 },
      };

      await getJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.response).toMatchObject({
        status: "success",
        message: "All job posts found successfully",
        jobPost: {
          id: 123,
          title: "Software Engineer",
        },
      });
    });

    it("Returns 404 if the job post is not found", async () => {
      const mockReq = {
        method: "GET",
        params: { job_posting_id: 999 },
      };

      await getJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(404); // If the response format changes, adjust this.
      expect(mockRes.response).toMatchObject({
        message: "No job post with id 999 found.",
      });
    });

    it("Returns 405 if the method is not GET", async () => {
      const mockReq = {
        method: "POST",
        params: { job_posting_id: 123 },
      };

      await getJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(405);
      expect(mockRes.response).toMatchObject({
        message: "Method not allowed, only GET methods allowed.",
      });
    });

    it("Handles server errors gracefully", async () => {
      mockJobPosting.findOne = async () => {
        throw new Error("Database error");
      };

      const mockReq = {
        method: "GET",
        params: { job_posting_id: 123 },
      };

      await getJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(500);
      expect(mockRes.response).toMatchObject({
        status: "error",
        message: "An unexpected server error occurred.",
      });
    });
  });
});

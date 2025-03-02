import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";

const mock = require("mock-require");
const mockAddJobPosts = require("../../mocks/mockAddJobPosts");

let addJobPostRequestHandler;

beforeEach(() => {
  // Mock the JobPosting model
  mock("../../../src/models/job_posts.model", mockAddJobPosts);

  // Re-require the handler to apply the mock
  addJobPostRequestHandler = mock.reRequire(
    "../../../src/controllers/job_posts/addJobPost",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_posts.model");
});

describe("addJobPostRequestHandler test suite", () => {
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

  describe("Draft vs Non-Draft Behavior", () => {
    it("Returns 400 if title is missing for drafts", async () => {
      const mockReq = {
        body: { state: "Draft" },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Title is required for Drafts",
      });
    });

    it("Returns 400 if required fields are missing for non-drafts", async () => {
      const mockReq = {
        body: {
          state: "Active",
          title: "Frontend Developer",
          employer: "Tech Corp",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 20,
          rate_of_pay_max: 50,
          rate_of_pay_frequency: "hourly",
          job_type: "Full-time",
          close_date: null,
          job_description: null,
        },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining(
            "The following fields are required for non-draft jobs",
          ),
        }),
      );
    });
  });

  describe("Rate of Pay Validation", () => {
    it("Returns 400 if rateOfPayMin is greater than rateOfPayMax", async () => {
      const mockReq = {
        body: {
          title: "Frontend Developer",
          employer: "Tech Corp",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 60,
          rate_of_pay_max: 50,
          rate_of_pay_frequency: "hourly",
          job_type: "Full-time",
          state: "Active",
          close_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          job_description: "Some description",
        },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error:
          "Minimum rate of pay must be less than or equal to maximum rate of pay.",
      });
    });
  });

  describe("Close Date Validation", () => {
    it("Returns 400 if close date is in the past", async () => {
      const mockReq = {
        body: {
          title: "Frontend Developer",
          employer: "Tech Corp",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 20,
          rate_of_pay_max: 50,
          rate_of_pay_frequency: "hourly",
          job_type: "Full-time",
          close_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
          state: "Active",
          job_description: "Some description",
        },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Close date must be in the future.",
      });
    });
  });

  describe("State Validation", () => {
    it("Defaults to Draft if state is not Active", async () => {
      const mockReq = {
        body: {
          title: "Frontend Developer",
          employer: "Tech Corp",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 20,
          rate_of_pay_max: 50,
          rate_of_pay_frequency: "hourly",
          job_type: "Full-time",
          state: "Draft",
          close_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          job_description: "Some description",
        },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            jobPost: expect.objectContaining({
              state: "Draft",
            }),
          }),
        }),
      );
    });

    it("Remains Active if state is set to Active", async () => {
      const mockReq = {
        body: {
          title: "Frontend Developer",
          employer: "Tech Corp",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 20,
          rate_of_pay_max: 50,
          rate_of_pay_frequency: "hourly",
          job_type: "Full-time",
          state: "Active",
          close_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          job_description: "Some description",
        },
        user: { id: 123 },
      };

      await addJobPostRequestHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            jobPost: expect.objectContaining({
              state: "Active",
            }),
          }),
        }),
      );
    });
  });
});

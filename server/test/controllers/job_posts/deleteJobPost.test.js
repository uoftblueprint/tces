import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";

const mock = require("mock-require");
const mockJobApplications = {
  findAll: async () => [{ resume: "resume1.pdf" }, { resume: "resume2.pdf" }],
  destroy: async () => 1, // Simulate successful deletion of job applications
};
const mockDeleteJobPosts = require("../../mocks/mockDeleteJobPosts");

let deleteJobPostHandler;

beforeEach(() => {
  mock("../../../src/models/job_posts.model", mockDeleteJobPosts);
  mock("../../../src/models/job_applications.model", mockJobApplications);

  // Re-require the handler to apply the mock
  deleteJobPostHandler = mock.reRequire(
    "../../../src/controllers/job_posts/deleteJobPost",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_posts.model");
  mock.stop("../../../src/models/job_applications.model");
});

describe("deleteJobPostHandler test suite", () => {
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

  describe("Delete Job Post", () => {
    it("Deletes job post and associated applications successfully", async () => {
      const mockReq = {
        params: { job_posting_id: 123 },
      };

      await deleteJobPostHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        message:
          "Job Posts and all associated Job Applications have been successfully deleted",
        data: null,
      });
    });

    it("Returns 400 if the job post does not exist", async () => {
      const mockReq = {
        params: { job_posting_id: 999 },
      };

      await deleteJobPostHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Job Posting could not be found.",
      });
    });

    it("Returns 400 if job_posting_id is invalid", async () => {
      const mockReq = {
        params: { job_posting_id: "invalid" },
      };

      await deleteJobPostHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid or missing job_posting_id",
      });
    });

    it("Returns 500 if there is a server error", async () => {
      vi.spyOn(mockDeleteJobPosts, "findByPk").mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const mockReq = {
        params: { job_posting_id: 123 },
      };

      await deleteJobPostHandler(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Database error",
      });
    });
  });
});

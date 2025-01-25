import { expect, describe, it, afterEach, beforeEach } from "vitest";
const mock = require("mock-require");
const mockUpdateJobPost = require("../../mocks/mockUpdateJobPost");

let updateJobPostsRequestHandler;

beforeEach(() => {
  // Mock the models
  mock("../../../src/models/job_posts.model", mockUpdateJobPost);
  mock("../../../src/models/user.model", mockUpdateJobPost);

  // Re-require the handler to apply the mock
  updateJobPostsRequestHandler = mock.reRequire(
    "../../../src/controllers/job_posts/updateJobPost",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_posts.model");
  mock.stop("../../../src/models/user.model");
});

describe("updateJobPostsRequestHandler test suite", () => {
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

  it("Updates a job post successfully", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 123 },
      body: { title: "Updated Title" },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.response).toMatchObject({
      status: "success",
      message: "Job Post 123 updated successfully",
      data: { id: 123, title: "Updated Title" },
    });
  });

  it("Returns 400 for invalid job_post_id", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: "invalid" },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(400);
    expect(mockRes.response).toMatchObject({
      status: "fail",
      message: "Invalid or missing job_post_id.",
    });
  });

  it("Returns 404 if the job post is not found", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 999 },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(404);
    expect(mockRes.response).toMatchObject({
      status: "fail",
      message: "Job posting not found",
    });
  });

  it("Returns 403 if trying to update the job post ID", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 123 },
      body: { id: 999 },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(403);
    expect(mockRes.response).toMatchObject({
      status: "fail",
      message: "You cannot change the id of a job posting.",
    });
  });

  it("Returns 400 if required fields are missing when changing state to Active", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 123 },
      body: { state: "Active" }, // Missing required fields
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(400);
    expect(mockRes.response).toMatchObject({
      status: "fail",
      message: expect.stringContaining(
        "Cannot change to Active: Missing required field",
      ),
    });
  });

  it("Returns 400 if the creator does not exist", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 123 },
      body: { creator: 999 },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(400);
    expect(mockRes.response).toMatchObject({
      status: "fail",
      message: "Creator with ID 999 does not exist.",
    });
  });

  it("Returns 405 for non-PUT requests", async () => {
    const mockReq = {
      method: "POST",
      params: { job_post_id: 123 },
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(405);
    expect(mockRes.response).toMatchObject({
      message: "Method not allowed, only PUT methods allowed.",
    });
  });

  it("Handles server errors gracefully", async () => {
    const mockReq = {
      method: "PUT",
      params: { job_post_id: 123 },
      body: { title: "Server Error Test" },
    };

    mockUpdateJobPost.findOne = async () => {
      throw new Error("Database error");
    };

    await updateJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(500);
    expect(mockRes.response).toMatchObject({
      status: "error",
      message: "An unexpected server error occurred.",
    });
  });
});

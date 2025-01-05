import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";

const mock = require("mock-require");
const mockGetAllJobPosts = require("../mocks/mockGetAllJobPosts");

let getAllJobPostsRequestHandler;

beforeEach(() => {
  // Mock the JobPosting model
  mock("../../src/models/job_posts.model", mockGetAllJobPosts);

  // Re-require the handler to apply the mock
  getAllJobPostsRequestHandler = mock.reRequire(
    "../../src/controllers/job_posts/getAllJobPosts",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/job_posts.model");
});

describe("getAllJobPostsRequestHandler test suite", () => {
  const mockReq = {
    method: "GET",
    query: { page: "1", pageSize: "5" },
  };

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

  it("Does not call findOne", async () => {
    const spy = vi.spyOn(mockGetAllJobPosts, "findOne");

    await getAllJobPostsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Returns 200 on success", async () => {
    await getAllJobPostsRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });

  it("Handles errors and returns 500", async () => {
    // Mock an error response
    vi.spyOn(mockGetAllJobPosts, "findAndCountAll").mockImplementationOnce(
      () => {
        throw new Error("Database error");
      },
    );

    await getAllJobPostsRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(500);
  });

  it("Handles pagination correctly", async () => {
    // Simulate a request for page 2 with pageSize 2
    mockReq.query = { page: "1", pageSize: "2" };

    await getAllJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "success",
      message: "All job posts found successfully",
      allJobPosts: {
        totalPosts: 4, // Total posts in the database
        totalPages: 2, // With pageSize of 2, there are 2 total pages
        currentPage: 1, // Page 1 (0-based indexing)
        data: [
          { id: 3, title: "Web Developer", state: "Active" },
          { id: 4, title: "DevOps Engineer", state: "Draft" },
        ],
      },
      publicJobPosts: {
        totalPosts: 3, // Only 3 posts with state: "Active"
        totalPages: 2,
        currentPage: 1, // Page 1 for active posts
        data: [{ id: 3, title: "Web Developer", state: "Active" }],
      },
    });
  });

  it("Handles all mock objects without pagination parameters", async () => {
    // Simulate a request without pagination parameters
    mockReq.query = {};

    await getAllJobPostsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "success",
      message: "All job posts found successfully",
      allJobPosts: {
        totalPosts: 4, // Total posts in the database
        totalPages: 1, // No pagination, so all items fit in a single page
        currentPage: null, // No page provided
        data: [
          { id: 1, title: "Software Engineer", state: "Active" },
          { id: 2, title: "Data Scientist", state: "Active" },
          { id: 3, title: "Web Developer", state: "Active" },
          { id: 4, title: "DevOps Engineer", state: "Draft" },
        ],
      },
      publicJobPosts: {
        totalPosts: 3, // Only 3 posts with state: "Active"
        totalPages: 1, // No pagination for active posts
        currentPage: null, // No page provided
        data: [
          { id: 1, title: "Software Engineer", state: "Active" },
          { id: 2, title: "Data Scientist", state: "Active" },
          { id: 3, title: "Web Developer", state: "Active" },
        ],
      },
    });
  });
});

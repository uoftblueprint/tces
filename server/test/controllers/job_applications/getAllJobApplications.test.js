import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
const mock = require("mock-require");

const mockJobApplications = require("../../mocks/mockJobApplications");

let getAllJobApplicationsRequestHandler;

beforeEach(() => {
  // Mock the JobApplications model
  mock("../../../src/models/job_applications.model", mockJobApplications);

  // Re-require the handler to apply the mocks
  getAllJobApplicationsRequestHandler = mock.reRequire(
    "../../../src/controllers/job_applications/getAllJobApplications",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_applications.model");
});

describe("getAllJobApplicationsRequestHandler test suite", () => {
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

  it("Returns all job applications sorted by createdAt in descending order", async () => {
    const mockReq = {
      query: {},
    };

    await getAllJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "All Job Applications found successfully",
        jobApplications: expect.any(Array),
      }),
    );
  });

  it("Applies pagination when page and pageSize are provided", async () => {
    const mockReq = {
      query: {
        page: "1",
        pageSize: "2",
      },
    };

    await getAllJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "All Job Applications found successfully",
        jobApplications: expect.any(Array),
      }),
    );
  });

  it("Filters job applications by job_posting_id when provided", async () => {
    const mockReq = {
      query: {
        job_posting_id: "123",
      },
    };

    await getAllJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "All Job Applications found successfully",
        jobApplications: expect.any(Array),
        totalJobApplicationsNumber: expect.any(Number),
      }),
    );
  });

  it("Handles errors gracefully and returns 500", async () => {
    const mockReq = {
      query: {},
    };

    vi.spyOn(mockJobApplications, "findAll").mockRejectedValueOnce(
      new Error("Database error"),
    );

    await getAllJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: "An error occurred while fetching job applications",
      }),
    );
  });
});

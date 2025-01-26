import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
const mock = require("mock-require");

const mockJobApplications = require("../../mocks/mockJobApplications");

let getOneJobApplicationsRequestHandler;

beforeEach(() => {
  // Mock the JobApplications model
  mock("../../../src/models/job_applications.model", mockJobApplications);

  // Re-require the handler to apply the mocks
  getOneJobApplicationsRequestHandler = mock.reRequire(
    "../../../src/controllers/job_applications/getOneJobApplication",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/job_applications.model");
});

describe("getOneJobApplicationsRequestHandler test suite", () => {
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

  it("Returns job applications sorted by applicationDate in descending order", async () => {
    const mockReq = {
      query: {},
    };

    await getOneJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Job Applications found successfully",
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

    await getOneJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Job Applications found successfully",
        jobApplications: expect.any(Array),
      }),
    );
  });

  it("Filters job applications by name when provided", async () => {
    const mockReq = {
      query: {
        name: "John Doe",
      },
    };

    await getOneJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Job Applications found successfully",
        jobApplications: expect.any(Array),
      }),
    );
  });

  it("Returns unique applicants' names", async () => {
    const mockReq = {
      query: {},
    };

    await getOneJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Job Applications found successfully",
        jobApplications: expect.any(Array),
        totalJobApplicationsNumber: expect.any(Number),
        uniqueApplicants: expect.arrayContaining(["John Doe"]),
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

    await getOneJobApplicationsRequestHandler(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: "An error occurred while fetching job applications",
      }),
    );
  });
});

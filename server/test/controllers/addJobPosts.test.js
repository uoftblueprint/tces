import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import addJobPostingRequestHandler from "../../src/controllers/job_posting/addJobPosts";

const mock = require("mock-require");
const mockJobPosting = require("../mocks/mockAddObject");
const mockUser = require("../mocks/mockGetAllObjects");

beforeEach(() => {
  mock("../../src/models/job_posting.model", mockJobPosting);
  mock("../../src/models/user.model", mockUser);
  // eslint-disable-next-line no-import-assign
  addJobPostingRequestHandler = mock.reRequire(
    "../../src/controllers/job_posting/addJobPosts"
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/job_posting.model");
});

describe("addJobPosts test suite", () => {
  const mockRes = {
    status: (code) => {
      mockRes.statusCode = code;
      return {
        json: (message) => {},
      };
    },
    statusCode: 0,
  };

  afterEach(() => {
    // Reset status code after each test
    mockRes.statusCode = 0;
  });

  describe("Add single job post", () => {
    const mockReq = {
      body: {
        job_posting: {
          title: "Software Developer",
          employer: "Tech Solutions",
          location: "Remote",
          hours_per_week: 40,
          rate_of_pay_min: 60000,
          rate_of_pay_max: 80000,
          rate_of_pay_frequency: "Annually",
          job_type: ["Full-time", "Permanent"],
          close_date: "2024-12-31",
          job_description: "Develop and maintain software applications.",
        },
      },
      user: {
        id: 1,
      },
    };

    it("Calls create", async () => {
      const spy = vi.spyOn(mockJobPosting, "create");

      await addJobPostingRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1); // one time to create the job posting
    });

    it("Does not call bulkCreate", async () => {
      const spy = vi.spyOn(mockJobPosting, "bulkCreate");

      await addJobPostingRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addJobPostingRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Add multiple job posts", () => {
    const mockReq = {
      body: {
        job_posting: [
          {
            title: "Software Developer",
            employer: "Tech Solutions",
            location: "Remote",
            hours_per_week: 40,
            rate_of_pay_min: 60000,
            rate_of_pay_max: 80000,
            rate_of_pay_frequency: "Annually",
            job_type: ["Full-time", "Permanent"],
            close_date: "2024-12-31",
            job_description: "Develop and maintain software applications.",
          },
          {
            title: "Business Analyst",
            employer: "Business Corp",
            location: "On-site",
            hours_per_week: 40,
            rate_of_pay_min: 50000,
            rate_of_pay_max: 70000,
            rate_of_pay_frequency: "Annually",
            job_type: ["Full-time"],
            close_date: "2024-12-31",
            job_description: "Analyze business data for insights.",
          },
        ],
      },
      user: {
        id: 1,
      },
    };

    it("Calls create multiple times for each job post", async () => {
      const spy = vi.spyOn(mockJobPosting, "create");

      await addJobPostingRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(2); // one time for each job posting creation
    });

    it("Returns 200 on success", async () => {
      await addJobPostingRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

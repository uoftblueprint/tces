import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import addJobLeadsRequestHandler from "../../src/controllers/job_lead/addJobLeads";

const mock = require("mock-require");
const mockAddJobLeads = require("../mocks/mockAddObject");
const mockEmployerTimelineEntry = require("../mocks/mockAddObject");
const mockUser = require("../mocks/mockGetAllObjects");

beforeEach(() => {
  mock("../../src/models/job_lead.model", mockAddJobLeads);
  mock(
    "../../src/models/employer_timeline_entry.model",
    mockEmployerTimelineEntry,
  );
  mock(
      "../../src/models/user.model",
      mockUser,
  );
  // eslint-disable-next-line no-import-assign
  addJobLeadsRequestHandler = mock.reRequire(
    "../../src/controllers/job_lead/addJobLeads",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/job_lead.model");
});

describe("addJobLeads test suite", () => {
  var mockRes = {
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

  describe("Add single job lead", () => {
    const mockReq = {
      body: {
        job_lead: {
          employer: 1,
          job_title: "software developer intern",
          compensation_max: 50000,
          compensation_max: 40000,
          hours_per_week: 40,
          national_occupation_code: 231232,
          job_description: "full-stack testing.",
          creation_date: "2023-11-29",
          expiration_date: "2023-12-31",
          employment_type: "Full Time",
        },
      },
      user: {
        id: 1,
      },
    };

    it("Calls create", async () => {
      const spy = vi.spyOn(mockAddJobLeads, "create");

      await addJobLeadsRequestHandler(mockReq, mockRes);
      // one time to create the job lead
      // one time to create timeline entry of action
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("Does not call bulkCreate", async () => {
      const spy = vi.spyOn(mockAddJobLeads, "bulkCreate");

      await addJobLeadsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addJobLeadsRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Add multiple clients", () => {
    const mockReq = {
      body: {
        job_lead: [
          {
            employer_name: "someone",
            job_title: "software developer intern",
            compensation_max: 50000,
            compensation_max: 40000,
            hours_per_week: 40,
            national_occupation_code: 231232,
            job_description: "full-stack testing.",
            creation_date: "2023-11-29",
            expiration_date: "2023-12-31",
            employment_type: "Full Time",
          },
          {
            employer_name: "someone else",
            job_title: "business analyst intern",
            compensation_max: 50000,
            compensation_max: 40000,
            hours_per_week: 40,
            national_occupation_code: 231232,
            job_description: "business testing.",
            creation_date: "2023-11-29",
            expiration_date: "2023-12-31",
            employment_type: "Full Time",
          },
        ],
      },
      user: {
        id: 1,
      },
    };

    it("Does call create multiple times", async () => {
      const spy = vi.spyOn(mockAddJobLeads, "create");

      await addJobLeadsRequestHandler(mockReq, mockRes);
      // 2 times for creating job leads
      // 2 times for creating timeline entry about action
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it("Returns 200 on success", async () => {
      await addJobLeadsRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

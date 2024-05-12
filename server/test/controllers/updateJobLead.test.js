import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import updateJobLeadRequestHandler from "../../src/controllers/job_lead/updateJobLead";
const mock = require("mock-require");

describe("updateJobLead test suite", () => {
  var mockRes = {
    status: (code) => {
      mockRes.statusCode = code;
      return {
        json: (message) => {
          return;
        },
      };
    },
    statusCode: 0,
  };

  afterEach(() => {
    // Reset status code after each test
    mockRes.statusCode = 0;

    // Reset mocks after every test
    mock.stop("../../src/models/job_lead.model");
  });

  describe("Invalid requests", async () => {
    it("Returns 404 if there is no user", async () => {
      mock("../../src/models/job_lead.model", {
        set: async () => {
          return {};
        },
        findOne: async () => {
          return null;
        },
      });

      const mockReq = {
        params: {
          client_id: 1,
        },
      };

      updateJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/updateJobLead",
      );
      await updateJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });

    it("Returns 401 if there is a user but no body parameters", async () => {
      mock("../../src/models/job_lead.model", {
        set: async () => {
          return {};
        },
        findOne: async () => {
          return { placeholder: true };
        },
      });

      const mockReq = {
        params: {
          job_lead_id: 1,
        },
        body: {},
      };

      updateJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/updateJobLead",
      );
      await updateJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(401);
    });

    it("Returns 400 if there is a SequelizeConstraintError", async () => {
      mock("../../src/models/job_lead.model", {
        findOne: async () => {
          const job_lead = {
            set: async (values) => {
              throw { name: "SequelizeUniqueConstraintError" };
            },
          };

          return job_lead;
        },
      });

      const mockReq = {
        params: {
          job_lead_id: 1,
        },
        body: {
          values: {
            owner: 1,
          },
        },
      };

      updateJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/updateJobLead",
      );
      await updateJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(400);
    });

    it("Returns 403 if you try to update the owner", async () => {
      mock("../../src/models/job_lead.model", {
        findOne: async () => {
          const job_lead = {
            set: async (values) => {
              return;
            },
          };

          return job_lead;
        },
      });

      const mockReq = {
        params: {
          job_lead_id: 1,
        },
        body: {
          values: {
            owner: 1,
            creator: 2,
          },
        },
      };

      updateJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/updateJobLead",
      );
      await updateJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(403);
    });
  });

  describe("Valid requests", async () => {
    const mockReq = {
      params: {
        job_lead_id: 1,
      },
      body: {
        values: {
          owner: 1,
        },
      },
    };

    it("Returns 200 on success", async () => {
      mock("../../src/models/job_lead.model", {
        findOne: async () => {
          const job_lead = {
            set: async (values) => {},
            save: async () => {},
          };

          return job_lead;
        },
      });

      updateJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/updateJobLead",
      );
      await updateJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

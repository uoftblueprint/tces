import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getOneJobLeadRequestHandler from "../../src/controllers/job_lead/getOneJobLead";
const mock = require("mock-require");
const mockGetOneClient = require("../mocks/mockGetOneObject");
const mockGetOneClientInvalid = require("../mocks/mockGetOneObjectInvalid");

const mockReq = {
  params: {
    job_lead_id: 1,
  },
};

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
  // Reset mocks after every test
  mock.stop("../../src/models/job_lead.model");

  // Reset status code after each test
  mockRes.statusCode = 0;
});

describe("getOneJobLead test suite", () => {
  describe("Valid requests", () => {
    beforeEach(() => {
      mock("../../src/models/job_lead.model", mockGetOneClient);
      getOneJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/getOneJobLead",
      );
    });

    it("Calls findOne", async () => {
      const spy = vi.spyOn(mockGetOneClient, "findOne");

      await getOneJobLeadRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call findAll", async () => {
      const spy = vi.spyOn(mockGetOneClient, "findAll");

      await getOneJobLeadRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await getOneJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Invalid requests", () => {
    beforeEach(() => {
      mock("../../src/models/job_lead.model", mockGetOneClientInvalid);
      getOneJobLeadRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/getOneJobLead",
      );
    });

    it("Returns 404 if the job lead does not exist", async () => {
      await getOneJobLeadRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });
  });
});

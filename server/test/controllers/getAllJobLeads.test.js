import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getAllJobLeadsRequestHandler from "../../src/controllers/job_lead/getAllJobLeads";
const mock = require("mock-require");
const mockGetManyClients = require("../mocks/mockGetAllClients");

beforeEach(() => {
  mock("../../src/models/job_lead.model", mockGetManyClients);
  getAllJobLeadsRequestHandler = mock.reRequire(
    "../../src/controllers/job_lead/getAllJobLeads",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/job_lead.model");
});

describe("getOneJobLead test suite", () => {
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
    // Reset status code after each test
    mockRes.statusCode = 0;
  });

  it("Does not call findOne", async () => {
    const spy = vi.spyOn(mockGetManyClients, "findOne");

    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Calls findAll", async () => {
    const spy = vi.spyOn(mockGetManyClients, "findAll");

    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Returns 200 on success", async () => {
    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});

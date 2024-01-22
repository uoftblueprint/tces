import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getAllJobLeadsRequestHandler from "../../src/controllers/job_lead/getAllJobLeads";
const mock = require("mock-require");
const mockGetManyClients = require("../mocks/mockGetAllObjects");

const mockUniqueOwners = [
  { owner: "Owner1" },
  { owner: "Owner2" },
];

mockUniqueOwners.map = vi.fn().mockImplementation(function (callback) {
  return Array.prototype.map.call(this, callback);
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/job_lead.model");
});

describe("getAllJobLeads test suite", () => {
  const mockReq = {
    params: {
      job_lead_id: 1,
    },
    query: {
      page: '2',
      pageSize: '10'
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
    mock("../../src/models/job_lead.model", mockGetManyClients);
    getAllJobLeadsRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/getAllJobLeads",
    );

    const spy = vi.spyOn(mockGetManyClients, "findOne");

    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Calls findAll", async () => {
    mock("../../src/models/job_lead.model", mockGetManyClients);
    getAllJobLeadsRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/getAllJobLeads",
    );

    const spy = vi.spyOn(mockGetManyClients, "findAll");

    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("Returns 200 on success", async () => {
    mock("../../src/models/job_lead.model", {
      ...mockGetManyClients,
      findAll: vi.fn().mockResolvedValue(mockUniqueOwners),
    });
    getAllJobLeadsRequestHandler = mock.reRequire(
        "../../src/controllers/job_lead/getAllJobLeads",
    );
    await getAllJobLeadsRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});

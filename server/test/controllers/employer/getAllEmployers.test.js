import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getAllEmployersRequestHandler from "../../../src/controllers/employer/getAllEmployers";
import mockGetManyClients from "../../mocks/mockGetAllObjects";
const Employer = await require("../../../src/models/employer.model");
const mock = require("mock-require");
const mockGetManyEmployers = require("../../mocks/mockGetAllEmployers");

const mockUniqueOwners = [{ owner: "Owner1" }, { owner: "Owner2" }];

mockUniqueOwners.map = vi.fn().mockImplementation(function (callback) {
  return Array.prototype.map.call(this, callback);
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/employer.model");
});

describe("getAllEmployers test suite", () => {
  const mockReq = {
    params: {
      employer_id: 1,
    },
    query: {
      page: "2",
      pageSize: "10",
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
    mock("../../../src/models/employer.model", mockGetManyEmployers);
    getAllEmployersRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/getAllEmployers",
    );
    const spy = vi.spyOn(mockGetManyEmployers, "findOne");

    await getAllEmployersRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Calls findAll", async () => {
    mock("../../../src/models/employer.model", mockGetManyEmployers);
    getAllEmployersRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/getAllEmployers",
    );
    const spy = vi.spyOn(mockGetManyEmployers, "findAll");

    await getAllEmployersRequestHandler(mockReq, mockRes);
    // one call for finding all employers
    // one call for finding distinct owners
    // thus two calls
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("Returns 200 on success", async () => {
    mock("../../src/models/job_lead.model", {
      ...mockGetManyClients,
      findAll: vi.fn().mockResolvedValue(mockUniqueOwners),
    });
    getAllEmployersRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/getAllEmployers",
    );
    await getAllEmployersRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});

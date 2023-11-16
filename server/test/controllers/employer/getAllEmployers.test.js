import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getAllEmployersRequestHandler from "../../../src/controllers/employer/getAllEmployers";
const Employer = await require("../../../src/models/employer.model");
const mock = require("mock-require");
const mockGetManyEmployers = require("../../mocks/mockGetAllEmployers");

beforeEach(() => {
  mock("../../../src/models/employer.model", mockGetManyEmployers);
  getAllEmployersRequestHandler = mock.reRequire(
    "../../../src/controllers/employer/getAllEmployers",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/employer.model");
});

describe("getOneEmployer test suite", () => {
  const mockReq = {
    params: {
      employer_id: 1,
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
    const spy = vi.spyOn(mockGetManyEmployers, "findOne");

    await getAllEmployersRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Calls findAll", async () => {
    const spy = vi.spyOn(mockGetManyEmployers, "findAll");

    await getAllEmployersRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Returns 200 on success", async () => {
    await getAllEmployersRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});
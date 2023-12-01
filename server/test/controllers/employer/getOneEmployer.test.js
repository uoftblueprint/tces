import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getOneEmployerRequestHandler from "../../../src/controllers/employer/getOneEmployer";
const Employer = await require("../../../src/models/employer.model");
const mock = require("mock-require");
const mockGetOneEmployer = require("../../mocks/mockGetOneEmployer");
const mockGetOneEmployerInvalid = require("../../mocks/mockGetOneEmployerInvalid");

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
  // Reset mocks after every test
  mock.stop("../../../src/models/employer.model");

  // Reset status code after each test
  mockRes.statusCode = 0;
});

describe("getOneEmployer test suite", () => {
  describe("Valid requests", () => {
    beforeEach(() => {
      mock("../../../src/models/employer.model", mockGetOneEmployer);
      getOneEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/getOneEmployer",
      );
    });

    it("Calls findOne", async () => {
      const spy = vi.spyOn(mockGetOneEmployer, "findOne");

      await getOneEmployerRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call findAll", async () => {
      const spy = vi.spyOn(mockGetOneEmployer, "findAll");

      await getOneEmployerRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await getOneEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Invalid requests", () => {
    beforeEach(() => {
      mock("../../../src/models/employer.model", mockGetOneEmployerInvalid);
      getOneEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/getOneEmployer",
      );
    });

    it("Returns 404 if the employer does not exist", async () => {
      await getOneEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });
  });
});

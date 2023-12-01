import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import addEmployersRequestHandler from "../../../src/controllers/employer/addEmployers";
const Employer = await require("../../../src/models/employer.model");
const mock = require("mock-require");
const mockAddEmployers = require("../../mocks/mockAddEmployers");

beforeEach(() => {
  mock("../../../src/models/employer.model", mockAddEmployers);
  addEmployersRequestHandler = mock.reRequire(
    "../../../src/controllers/employer/addEmployers",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../../src/models/employer.model");
});

describe("addEmployers test suite", () => {
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

  describe("Add single employer", () => {
    var mockReq = {
      body: {
        employer: {
          owner: 1,
          creator: 1,
          name: "name",
          email: "email@gmail.com",
        },
      },
    };

    it("Calls create", async () => {
      const spy = vi.spyOn(mockAddEmployers, "create");

      await addEmployersRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call bulkCreate", async () => {
      const spy = vi.spyOn(mockAddEmployers, "bulkCreate");

      await addEmployersRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addEmployersRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Add multiple employers", () => {
    const mockReq = {
      body: {
        employer: [
          {
            owner: 1,
            creator: 1,
            name: "name",
            email: "email@gmail.com",
            phone_number: "289-555-5555",
          },
          {
            owner: 1,
            creator: 2,
            name: "name",
            email: "email2@gmail.com",
            phone_number: "289-555-5555",
          },
        ],
      },
    };

    it("Calls bulkCreate", async () => {
      const spy = vi.spyOn(mockAddEmployers, "bulkCreate");

      await addEmployersRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call create", async () => {
      const spy = vi.spyOn(mockAddEmployers, "create");

      await addEmployersRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addEmployersRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

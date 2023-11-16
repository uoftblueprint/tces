import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import updateEmployerRequestHandler from "../../../src/controllers/employer/updateEmployer";
const mock = require("mock-require");

describe("updateEmployer test suite", () => {
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
    mock.stop("../../../src/models/employer.model");
  });

  describe("Invalid requests", async () => {
    it("Returns 404 if there is no user", async () => {
      mock("../../../src/models/employer.model", {
        set: async () => {
          return {};
        },
        findOne: async () => {
          return null;
        },
      });

      const mockReq = {
        params: {
          employer_id: 1,
        },
      };

      updateEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/updateEmployer",
      );
      await updateEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });

    it("Returns 401 if there is a user but no body parameters", async () => {
      mock("../../../src/models/employer.model", {
        set: async () => {
          return {};
        },
        findOne: async () => {
          return { placeholder: true };
        },
      });

      const mockReq = {
        params: {
          employer_id: 1,
        },
        body: {},
      };

      updateEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/updateEmployer",
      );
      await updateEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(401);
    });

    it("Returns 400 if there is a SequelizeConstraintError", async () => {
      mock("../../../src/models/employer.model", {
        findOne: async () => {
          const employer = {
            set: async (values) => {
              throw { name: "SequelizeUniqueConstraintError" };
            },
          };

          return employer;
        },
      });

      const mockReq = {
        params: {
          employer_id: 1,
        },
        body: {
          values: {
            owner: 1,
          },
        },
      };

      updateEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/updateEmployer",
      );
      await updateEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(400);
    });
  });

  describe("Valid requests", async () => {
    const mockReq = {
      params: {
        employer_id: 1,
      },
      body: {
        values: {
          owner: 1,
        },
      },
    };

    it("Returns 200 on success", async () => {
      mock("../../../src/models/employer.model", {
        findOne: async () => {
          const employer = {
            set: async (values) => {},
            save: async () => {},
          };

          return employer;
        },
      });

      updateEmployerRequestHandler = mock.reRequire(
        "../../../src/controllers/employer/updateEmployer",
      );
      await updateEmployerRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});
import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import updateClientRequestHandler from "../../src/controllers/client/updateClient";
import mockEmployerTimelineEntry from "../mocks/mockAddObject";
import mockUser from "../mocks/mockGetAllObjects";

const mock = require("mock-require");

describe("updateClient test suite", () => {
  var mockRes = {
    status: (code) => {
      mockRes.statusCode = code;
      return {
        json: (message) => {},
      };
    },
    statusCode: 0,
  };

  beforeEach(() => {
    mock(
      "../../src/models/employer_timeline_entry.model",
      mockEmployerTimelineEntry,
    );
    mock("../../src/models/user.model", mockUser);
  });

  afterEach(() => {
    // Reset status code after each test
    mockRes.statusCode = 0;

    // Reset mocks after every test
    mock.stop("../../src/models/client.model");
  });

  describe("Invalid requests", async () => {
    it("Returns 404 if there is no user", async () => {
      mock("../../src/models/client.model", {
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

      updateClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/updateClient",
      );
      await updateClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });

    it("Returns 401 if there is a user but no body parameters", async () => {
      mock("../../src/models/client.model", {
        set: async () => {
          return {};
        },
        findOne: async () => {
          return { placeholder: true };
        },
      });

      const mockReq = {
        params: {
          client_id: 1,
        },
        body: {},
      };

      updateClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/updateClient",
      );
      await updateClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(401);
    });

    it("Returns 400 if there is a SequelizeConstraintError", async () => {
      mock("../../src/models/client.model", {
        findOne: async () => {
          const client = {
            set: async (values) => {
              throw { name: "SequelizeUniqueConstraintError" };
            },
          };

          return client;
        },
      });

      const mockReq = {
        params: {
          client_id: 1,
        },
        body: {
          values: {
            owner: 1,
          },
        },
      };

      updateClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/updateClient",
      );
      await updateClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(400);
    });

    it("Returns 403 if you try to update the owner", async () => {
      mock("../../src/models/client.model", {
        findOne: async () => {
          const client = {
            set: async (values) => {},
          };

          return client;
        },
      });

      const mockReq = {
        params: {
          client_id: 1,
        },
        body: {
          values: {
            owner: 1,
            creator: 2,
          },
        },
      };

      updateClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/updateClient",
      );
      await updateClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(403);
    });
  });

  describe("Valid requests", async () => {
    const mockReq = {
      params: {
        client_id: 1,
      },
      body: {
        values: {
          owner: 1,
        },
      },
      user: {
        id: 1,
      },
    };

    it("Returns 200 on success", async () => {
      mock("../../src/models/client.model", {
        findOne: async () => {
          const client = {
            set: async (values) => {},
            save: async () => {},
          };

          return client;
        },
      });

      updateClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/updateClient",
      );
      await updateClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

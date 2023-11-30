import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getOneClientRequestHandler from "../../src/controllers/client/getOneClient";
const mock = require("mock-require");
const mockGetOneClient = require("../mocks/mockGetOneClient");
const mockGetOneClientInvalid = require("../mocks/mockGetOneClientInvalid");

const mockReq = {
  params: {
    client_id: 1,
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
  mock.stop("../../src/models/client.model");

  // Reset status code after each test
  mockRes.statusCode = 0;
});

describe("getOneClient test suite", () => {
  describe("Valid requests", () => {
    beforeEach(() => {
      mock("../../src/models/client.model", mockGetOneClient);
      getOneClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/getOneClient",
      );
    });

    it("Calls findOne", async () => {
      const spy = vi.spyOn(mockGetOneClient, "findOne");

      await getOneClientRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call findAll", async () => {
      const spy = vi.spyOn(mockGetOneClient, "findAll");

      await getOneClientRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await getOneClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Invalid requests", () => {
    beforeEach(() => {
      mock("../../src/models/client.model", mockGetOneClientInvalid);
      getOneClientRequestHandler = mock.reRequire(
        "../../src/controllers/client/getOneClient",
      );
    });

    it("Returns 404 if the client does not exist", async () => {
      await getOneClientRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(404);
    });
  });
});

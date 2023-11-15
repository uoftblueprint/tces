import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import getAllClientsRequestHandler from "../../src/controllers/client/getAllClients";
const Client = await require("../../src/models/client.model");
const mock = require("mock-require");
const mockGetManyClients = require("../mocks/mockGetAllClients");

beforeEach(() => {
  mock("../../src/models/client.model", mockGetManyClients);
  getAllClientsRequestHandler = mock.reRequire("../../src/controllers/client/getAllClients");
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/client.model");
});

describe("getOneClient test suite", () => {
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
    // Reset status code after each test
    mockRes.statusCode = 0;
  });

  it("Does not call findOne", async () => {
    const spy = vi.spyOn(mockGetManyClients, "findOne");

    await getAllClientsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Calls findAll", async () => {
    const spy = vi.spyOn(mockGetManyClients, "findAll");

    await getAllClientsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Returns 200 on success", async () => {
    await getAllClientsRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});

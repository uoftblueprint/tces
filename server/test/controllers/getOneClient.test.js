import { expect, vi, describe, it, afterEach } from "vitest";
import getOneClientRequestHandler from "../../src/controllers/client/getOneClient";
const Client = await require("../../src/models/client.model");

vi.hoisted(() => {
  const mock = require("mock-require");

  mock("../../src/models/client.model", {
    findOne: () => {
      return {};
    },
    findAll: () => {
      return {};
    },
  });
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

  it("Calls findOne", async () => {
    const spy = vi.spyOn(Client, "findOne");

    await getOneClientRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Does not call findAll", async () => {
    const spy = vi.spyOn(Client, "findAll");

    await getOneClientRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("Returns 200 on success", async () => {
    await getOneClientRequestHandler(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(200);
  });
});

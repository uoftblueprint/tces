import { expect, vi, describe, it, afterEach, beforeEach } from "vitest";
import addClientsRequestHandler from "../../src/controllers/client/addClients";
const mock = require("mock-require");
const mockAddClients = require("../mocks/mockAddClients");

beforeEach(() => {
  mock("../../src/models/client.model", mockAddClients);
  addClientsRequestHandler = mock.reRequire(
    "../../src/controllers/client/addClients",
  );
});

afterEach(() => {
  // Reset mocks after every test
  mock.stop("../../src/models/client.model");
});

describe("addClients test suite", () => {
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

  describe("Add single client", () => {
    var mockReq = {
      body: {
        client: {
          name: "name",
          email: "email@gmail.com",
          phone_number: "289-555-5555",
          status: "open?",
          closure_date: new Date(),
        },
      },
      user: {
        id: 1,
      },
    };

    it("Calls create", async () => {
      const spy = vi.spyOn(mockAddClients, "create");

      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call bulkCreate", async () => {
      const spy = vi.spyOn(mockAddClients, "bulkCreate");

      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addClientsRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });

  describe("Add multiple clients", () => {
    const mockReq = {
      body: {
        client: [
          {
            name: "name",
            email: "email@gmail.com",
            phone_number: "289-555-5555",
            closure_date: new Date(),
            status_at_exit: "active",
          },
          {
            name: "name",
            email: "email2@gmail.com",
            phone_number: "289-555-5555",
            closure_date: new Date(),
          },
        ],
      },
      user: {
        id: 1,
      },
    };

    it("Calls bulkCreate", async () => {
      const spy = vi.spyOn(mockAddClients, "bulkCreate");

      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call create", async () => {
      const spy = vi.spyOn(mockAddClients, "create");

      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addClientsRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });
  });
});

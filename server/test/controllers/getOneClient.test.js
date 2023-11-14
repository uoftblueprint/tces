import { expect, vi, describe, it, afterEach } from "vitest";
import addClientsRequestHandler from "../../src/controllers/client/addClients";
const Client = await require("../../src/models/client.model");

vi.hoisted(() => {
  const mock = require("mock-require");

  mock("../../src/models/client.model", {
    findOne: vi.fn(),
    findAll: vi.fn(),
  });
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
          owner: 1,
          creator: 1,
          name: "name",
          email: "email@gmail.com",
          phone_number: "289-555-5555",
          status: "open?",
          closure_date: new Date(),
          status_at_exit: "active",
          status_at_3_months: "active",
          status_at_6_months: "active",
          status_at_12_months: "active",
        },
      },
    };

    it("Calls create", async () => {
      const spy = vi.spyOn(Client, "create");

      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call bulkCreate", async () => {
      const spy = vi.spyOn(Client, "bulkCreate");

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
              owner: 1,
              creator: 1,
              name: "name",
              email: "email@gmail.com",
              phone_number: "289-555-5555",
              status: "open?",
              closure_date: new Date(),
              status_at_exit: "active",
              status_at_3_months: "active",
              status_at_6_months: "active",
              status_at_12_months: "active",
            },
            {
              owner: 1,
              creator: 2,
              name: "name",
              email: "email2@gmail.com",
              phone_number: "289-555-5555",
              status: "open?",
              closure_date: new Date(),
              status_at_exit: "active",
              status_at_3_months: "active",
              status_at_6_months: "active",
              status_at_12_months: "active",
            }
          ],
      },
    };
    
    it("Calls bulkCreate", async () => {


      const spy = vi.spyOn(Client, "bulkCreate");
  
      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Does not call create", async () => {


      const spy = vi.spyOn(Client, "create");
  
      await addClientsRequestHandler(mockReq, mockRes);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("Returns 200 on success", async () => {
      await addClientsRequestHandler(mockReq, mockRes);
      expect(mockRes.statusCode).toBe(200);
    });

  });
});

import { expect, vi, describe, it } from "vitest";
import addClientsRequestHandler from "../../src/controllers/client/addClients";


vi.hoisted(() => {
    const mock = require('mock-require');

    mock("../../src/models/client.model", {
        create: () => { console.log("create was called"); }
    });
});


describe("addClients test suite", () => {
  it("Calls create when you send a single client", async () => {
    const mockReq = {
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
            }
        }
    };
    const mockRes = {
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

    const Client = await require("../../src/models/client.model");

    console.log(Client);

    const spy = vi.spyOn(Client, "create");

    await addClientsRequestHandler(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

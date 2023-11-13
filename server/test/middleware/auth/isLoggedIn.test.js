import { expect, vi, describe, it } from "vitest";
import isLoggedIn from "../../../src/middlewares/auth/isLoggedIn";

describe("createUser test suite", () => {
  it("should respond with a 403 if you are not logged in", async () => {
    const mockReq = {};
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
    const mockNext = vi.fn();

    await isLoggedIn(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).toBe(403);
  });

  it("should respond with 403 if the user is not in the database", async () => {
    const mockReq = { user: { username: "user" } };
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
    const mockNext = vi.fn();

    vi.mock("../../../src/models/user.model", () => {
      return {
        findOne: async (options) => {
          return null;
        },
      };
    });

    await isLoggedIn(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).toBe(403);
  });
});

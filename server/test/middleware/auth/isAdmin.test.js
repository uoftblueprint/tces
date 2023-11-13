import { expect, vi, describe, it } from "vitest";
import isAdmin from "../../../src/middlewares/auth/isAdmin";

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

    await isAdmin(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).toBe(403);
  });

  it("should respond with a 403 if you are not an admin", async () => {
    const mockReq = { user: { is_admin: false } };
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

    await isAdmin(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).toBe(403);
  });

  it("should respond with a 403 if you are not logged in", async () => {
    const mockReq = {
      user: {
        is_admin: true,
        username: "admin",
      },
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
    const mockNext = vi.fn();

    vi.mock("../../../src/models/user.model", () => {
      return {
        findOne: async (options) => {
          return null;
        },
      };
    });

    await isAdmin(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).toBe(403);
  });

  it("should not respond with 403", () => {
    const mockReq = {
      user: {
        is_admin: true,
        username: "admin",
      },
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
    const mockNext = vi.fn();

    vi.mock("../../../src/models/user.model", () => {
      return {
        findOne: async (options) => {
          return { is_admin: true };
        },
      };
    });

    isAdmin(mockReq, mockRes, mockNext);
    expect(mockRes.statusCode).not.toBe(403);
  });
});

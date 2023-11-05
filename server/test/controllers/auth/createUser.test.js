import { expect, vi, describe, it } from "vitest";
import createUserRequestHandler from "../../../src/controllers/auth/createUser";

describe('createUser test suite', () => {
    it('should respond with a 403 if you are not logged in', async () => {
        const mockReq = {  };
        const mockRes = { 
            status: (code) => { mockRes.statusCode = code; return { send: (message) => { return ; } } },
            statusCode: 0
        };
        const mockNext = vi.fn();

        await createUserRequestHandler(mockReq, mockRes, mockNext);
        expect(mockRes.statusCode).toBe(403);
    });

    it('should respond with a 403 if you are not an admin', async () => {
        const mockReq = { user: { is_admin: false } };
        const mockRes = { 
            status: (code) => { mockRes.statusCode = code; return { send: (message) => { return ; } } },
            statusCode: 0
        };
        const mockNext = vi.fn();

        await createUserRequestHandler(mockReq, mockRes, mockNext);
        expect(mockRes.statusCode).toBe(403);
    });
});
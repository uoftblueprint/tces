// server/index.js
import { expect, test } from '@jest/globals';

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


const request = require("jest");
const endpoint = require("../app.get");

describe("GET / ", () => {
    test("should respond with Hello from server!", async () => {
        const response = await request(endpoint).get("/");
        expect(response.body).toEqual("Hello from server!");
        expect(response.statusCode).toBe(200);
    })
})

// server/index.js

const express = require("express");
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 3001;

const app = express();

// Trying to handle CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3006'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// Allow parsing of JSON data
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Test POST request
app.post("/api", (req, res) => {
    const request = req.body;
    console.log(request);
    if (!request) {
        return res.status(400).json({ message: "No request body" });;
    }
    res.json({ message: "Data received!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
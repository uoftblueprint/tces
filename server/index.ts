// server/index.js

import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017"; // Connection URI
const client = new MongoClient(uri); // Create a new MongoClient

async function run() {
  try {
    await client.connect(); // Connect the client to the server
    await client.db("admin").command({ ping: 1 }); // Establish and verify connection
    console.log("Connected successfully to database server");
  } catch (error) {
    console.error("Database connection failed", error);
  } finally {
    await client.close(); // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

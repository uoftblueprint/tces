import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

// Allow parsing of JSON data
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
	res.json({ message: "Hello from server! NEW HOT " });
});

// Test POST request
app.post("/api", (req:Request, res: Response) => {
	const request = req.body;
	if (!request) {
		return res.status(400).json({ message: "No request body" });
	}
	res.json({ message: "Data received! " + request.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const { MongoClient } = require("mongodb");
const uri = "mongodb://mongo:27017";  // Connection URI
const client = new MongoClient(uri);  // Create a new MongoClient

async function run() {
  try {
    await client.connect();  // Connect the client to the server
    await client.db("admin").command({ ping: 1 });  // Establish and verify connection
    console.log("Connected successfully to database server");
  } catch(error) {
    console.error("Database connection failed", error);
  } finally {
    await client.close();  // Ensures that the client will close when you finish/error
  }
}

//run().catch(console.dir);

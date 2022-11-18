// server/index.js
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Allow parsing of JSON data
app.use(express.json());

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// Test POST request
app.post("/api", (req, res) => {
	const request = req.body;
	if (!request) {
		return res.status(400).json({ message: "No request body" });
	}
	res.json({ message: "Data received! " + request.message });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

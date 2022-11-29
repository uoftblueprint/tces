import express, { Request, Response } from 'express';
import { connectToDatabase } from './database/conn';

const PORT = process.env.PORT || 3001;

const app = express();

// Allow parsing of JSON data
app.use(express.json());


connectToDatabase()
  .then(() => {
    app.get("/api", (req: Request, res: Response) => {
      res.json({ message: "Hello from server!" });
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
  })
  .catch((error: Error) => {
    console.error("Database Connection Failed", error)
    process.exit()
  }
  )



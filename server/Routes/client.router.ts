import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Client from "../Models/client";
import { collections } from "../Controller/client.controller";

export const clientsRouter = express.Router();

clientsRouter.use(express.json());

clientsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const client = (await collections.clients.findOne(
      query
    )) as unknown as Client;

    res.status(200).send(client);
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching client with id: ${req.params.id}`);
  }
});

clientsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newClient = req.body as Client;
    const result = await collections.clients.insertOne(newClient);

    result
      ? res
          .status(201)
          .send(
            `Successfully created a new client with id ${result.insertedId}`
          )
      : res.status(500).send("Failed to create a new client.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

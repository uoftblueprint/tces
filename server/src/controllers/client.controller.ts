import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database/conn";
import Client from "../models/client.model";

const getClient = async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const client = (await collections.clients?.findOne(
      query
    )) as unknown as Client;

    if (client) {
      res.status(200).send(client);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${id}`);
  }
};

const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = req.body as Client;
    const result = await collections.clients?.insertOne(newClient);

    result
      ? res
          .status(201)
          .send(`Successfully created a new job with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new job.");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).send(error.message);
    } else {
      console.log("Unexpected error", error);
      res.status(400).send(error);
    }
  }
};

export { getClient, createClient };

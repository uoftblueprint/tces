// External Dependencies
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../src/database/conn";
import Job from "../models/job.model";

const getJobById = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const job = (await collections.jobs?.findOne(query)) as unknown as Job;

        if (job) {
            res.status(200).send(job);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${id}`);
    }
};

const createJob = async (req: Request, res: Response) => {
    try {
        const newJob = req.body as Job;
        const result = await collections.jobs?.insertOne(newJob);

        result
            ? res.status(201).send(`Successfully created a new job with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new job.");
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).send(error.message);
        } else {
            console.log('Unexpected error', error);
            res.status(500).send(error);
        }
    }
};

export { getJobById, createJob };
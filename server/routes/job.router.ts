// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../controllers/job.controller";
import Job from "../models/job";

// Global Config
export const jobsRouter = express.Router();

jobsRouter.use(express.json());

// GET
jobsRouter.get("/api/job/:id", async (req: Request, res: Response) => {
    // TODO: clarify what job_id corresponds to
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const job = (await collections.jobs.findOne(query)) as Job;

        if (job) {
            res.status(200).send(job);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
jobsRouter.post("/api/job", async (req: Request, res: Response) => {
    try {
        const newJob = req.body as Job;
        const result = await collections.jobs.insertOne(newJob);

        result
            ? res.status(201).send(`Successfully created a new job with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new job.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

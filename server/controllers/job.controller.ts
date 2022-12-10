// External Dependencies
import { NextFunction, Request, Response } from "express";
import Job from "../models/job.model";

const getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const job = await Job.getJobById(id);
        res.status(200).json(job);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(404).send(error.message);
            next(error);
        } else {
            console.log('Unexpected error', error);
            res.status(500).send(error);
            next(error);
        }
    }
};

const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newJob = req.body as Job;
        const result = await Job.createJob(newJob);
        res.status(201).send(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).send(error.message);
            next(error);
        } else {
            console.log('Unexpected error', error);
            res.status(500).send(error);
            next(error);
        }
    }
};

export { getJobById, createJob };
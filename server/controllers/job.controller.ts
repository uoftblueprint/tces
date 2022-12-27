// External Dependencies
import { NextFunction, Request, Response } from "express";
import Job from "../models/job.model";
import { ObjectId } from "mongodb";

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
        const newJob = new Job(
            req.body.title, 
            new Date(req.body.creation_date), 
            new ObjectId(req.body.creator_id),
            req.body.owner_id ? new ObjectId(req.body.owner_id) : new ObjectId(req.body.creator_id),
            JSON.parse(JSON.stringify(req.body.timeline)),
            new ObjectId(req.body.employer_id),
            req.body.pay_per_hour ? req.body.pay_per_hour : undefined,
            req.body.address_id ? new ObjectId(req.body.address_id) : undefined, 
            req.body.description ? req.body.description : undefined,
            req.body.type ? req.body.type : undefined,
            req.body.expiry_date ? new Date(req.body.expiry_date) : undefined
        );
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

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const result = await Job.deleteJob(id);
        res.status(202).send(result);
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

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const updateJob = new Job(
            req.body.title, 
            new Date(req.body.creation_date), 
            new ObjectId(req.body.creator_id),
            req.body.owner_id ? new ObjectId(req.body.owner_id) : new ObjectId(req.body.creator_id),
            JSON.parse(JSON.stringify(req.body.timeline)),
            new ObjectId(req.body.employer_id),
            req.body.pay_per_hour ? req.body.pay_per_hour : undefined,
            req.body.address_id ? new ObjectId(req.body.address_id) : undefined, 
            req.body.description ? req.body.description : undefined,
            req.body.type ? req.body.type : undefined,
            req.body.expiry_date ? new Date(req.body.expiry_date) : undefined
        );
        const result = await Job.updateJob(id, updateJob);
        res.status(200).send(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(304).send(error.message);
            next(error);
        } else {
            console.log('Unexpected error', error);
            res.status(500).send(error);
            next(error);
        }
    }
};

export { getJobById, createJob, deleteJob, updateJob };
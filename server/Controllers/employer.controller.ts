import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ObjectId} from "mongodb";
import {collections} from "../src/database/conn";
import Employer  from "../Models/employer";

const getEmployer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const employer = await Employer.getEmployer(id);
        res.status(200).json(employer);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err);
            res.status(404).send(err.message);
            next(err);
        } else {
            console.log('Unexpected error', err);
            res.status(500).send(err);
            next(err);
        }
    }
};

const createEmployer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newEmployer = req.body as Employer;
        const result = await Employer.createEmployer(newEmployer);
        res.status(201).send(result);
    } catch (err) {
        if (err instanceof Error) { 
            console.log(err);
            res.status(400).send(err.message);
            next(err);
        } else {
            console.log(`Unexpected error`, err);
            res.status(500).send(err);
            next(err);
        }
    }
}

export { getEmployer, createEmployer };







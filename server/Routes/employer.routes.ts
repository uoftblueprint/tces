import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Employer from "../Models/employer";
import { collections } from "../Controller/employer.controller"

export const employersRouter = express.Router();

employersRouter.use(express.json());

employersRouter.get("/:id", async (req: Request, res: Response) => { 
    const id = req?.params?.id;
    try { 
        const query = { _id: new ObjectId(id) };
        const employer = (await collections.employers?.findOne(
            query
        )) as unknown as Employer;
        res.status(200).send(employer);
    } catch (err) { 
        res.status(404).send('idk')
    }
})

employersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newEmployer = req.body as Employer;
        const result = await collections.employers?.insertOne(newEmployer);

        result
            ? res
                .status(201).send('yes')
            : res.status(500).send('gg');
    } catch (err) {
        res.status(400).send(err.message);
    }
})
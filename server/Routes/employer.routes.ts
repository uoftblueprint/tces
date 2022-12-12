import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Employer from "../Models/employer";
import * as EmployerController from "../Controllers/employer.controller";

export const employersRouter = express.Router();
employersRouter.use(express.json());

//GET
employersRouter.get("/employer/:id", EmployerController.getEmployer);

//POST 
employersRouter.post("/employer", EmployerController.createEmployer);

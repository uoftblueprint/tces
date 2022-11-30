// External Dependencies
import express from "express";
import * as JobController from "../controllers/job.controller";

// Global Config
export const jobsRouter = express.Router();
jobsRouter.use(express.json());

// GET
jobsRouter.get("/job/:id", JobController.getJob);

// POST
jobsRouter.post("/job", JobController.createJob);
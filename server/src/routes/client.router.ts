import express from "express";
import * as ClientController from "../controllers/client.controller";

// Global Config
export const jobsRouter = express.Router();
jobsRouter.use(express.json());

// GET
jobsRouter.get("/job/:id", ClientController.getClient);

// POST
jobsRouter.post("/job", ClientController.createClient);

import express from "express";
import * as ClientController from "../controllers/client.controller";

// Global Config
export const clientRouter = express.Router();
clientRouter.use(express.json());

// GET
clientRouter.get("/client/:id", ClientController.getClientById);

// POST
clientRouter.post("/client", ClientController.createClient);

// DELETE
clientRouter.delete("/client/:id", ClientController.deleteClient);

// PUT
clientRouter.put("/client/:id", ClientController.updateClient);
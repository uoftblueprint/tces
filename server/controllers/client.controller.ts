import { NextFunction, Request, Response } from "express";
import Client from "../models/client.model";

const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req?.params?.id;
    const client = Client.getClientById(id)
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error){
      console.log(error);
      res.status(404).send(error.message);
      next(error);
    }
    else{
      console.log('Unexpected error', error);
      res.status(500).send(error);
      next(error);
    }
  }
};

const createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Client.createClient(req.body);
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

const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const result = await Client.deleteClient(id);
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

const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.params?.id;
        const result = await Client.updateClient(id, req.body);
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

export {getClientById, createClient, updateClient, deleteClient}

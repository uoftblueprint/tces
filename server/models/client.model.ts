import { ObjectId } from "mongodb";
import { collections } from "../src/database/conn"

export default class Client {
  public first_name: string
  public last_name: string
  public assignee_id: ObjectId
  public date_created: Date
  public status: ["ACTIVE", "INACTIVE", "R&I", "CLOSED"]
  public phone_num?: string
  public email?: string
  public closure_info?: { date_closed: Date; closure_status: ["EMPLOYED", "EMPLOYED_AND_TRAINING", "TRAINING", "NO_RESULT"] }
  

  constructor(
    first_name: string,
    last_name: string,
    assignee_id: ObjectId,
    date_created: Date,
    status: ["ACTIVE", "INACTIVE", "R&I", "CLOSED"],
    phone_num?: string,
    email?: string,
    closure_info?: { date_closed: Date; closure_status: ["EMPLOYED", "EMPLOYED_AND_TRAINING", "TRAINING", "NO_RESULT"] },
  ) {
    this.first_name = first_name
    this.last_name = last_name
    this.assignee_id = assignee_id
    this.date_created = date_created
    this.phone_num = phone_num
    this.email = email
    this.closure_info = closure_info
    this.status = status

  }

  static async getClientById(id: string){
    const query = { _id: new ObjectId(id) };
    const client = (await collections.clients?.findOne(query)) as unknown as Client;
    return new Promise((resolve, reject) => {
      if(client) {    
        resolve(client);  
      } else {    
        reject(new Error(`Unable to find matching client with id: ${id}`));  
      }
    });
  }

  static async createClient(newClientInfo: { 
    first_name: string; last_name: string; assignee_id: string; date_created: string; status: ["ACTIVE", "INACTIVE", "R&I", "CLOSED"];
    phone_num: string | undefined; email: string | undefined; files: Array<Object> | undefined;
    closure_info: { date_closed: Date; closure_status: ["EMPLOYED", "EMPLOYED_AND_TRAINING", "TRAINING", "NO_RESULT"] } | undefined;
  }) {
    const newClient = new Client(
      newClientInfo.first_name, newClientInfo.last_name, new ObjectId(newClientInfo.assignee_id), new Date(newClientInfo.date_created), newClientInfo.status,
      newClientInfo.phone_num ? newClientInfo.phone_num : undefined, 
      newClientInfo.email ? newClientInfo.email : undefined, 
      newClientInfo.closure_info ? newClientInfo.closure_info : undefined, 
    );
    const result = await collections.clients?.insertOne(newClient);
    return new Promise((resolve, reject) => {
      if(result) {
        resolve(`Successfully created a new client with id ${result.insertedId}`);
      } else {
        reject(new Error("Failed to create a new client."));
      }
    });
  }

  static async deleteClient(id: string) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.clients?.deleteOne(query);
    return new Promise((resolve, reject) => {
      if (result && result.deletedCount) {
        resolve(`Successfully removed client with id ${id}`);
      } else if (!result) {
        reject(new Error(`Failed to remove client with id ${id}`));
      } else if (!result.deletedCount) {
        reject(new Error(`Client with id ${id} does not exist`));
      }
    });
  }

  static async updateClient(id: string, updateClientInfo: { 
    first_name: string; last_name: string; assignee_id: string; date_created: string; status: ["ACTIVE", "INACTIVE", "R&I", "CLOSED"];
    phone_num: string | undefined; email: string | undefined; files: Array<Object> | undefined;
    closure_info: { date_closed: Date; closure_status: ["EMPLOYED", "EMPLOYED_AND_TRAINING", "TRAINING", "NO_RESULT"] } | undefined;
  }) {
    const query = { _id: new ObjectId(id) };
    const updateJob = new Client(
      updateClientInfo.first_name, updateClientInfo.last_name, new ObjectId(updateClientInfo.assignee_id), new Date(updateClientInfo.date_created), updateClientInfo.status,
      updateClientInfo.phone_num ? updateClientInfo.phone_num : undefined, 
      updateClientInfo.email ? updateClientInfo.email : undefined, 
      updateClientInfo.closure_info ? updateClientInfo.closure_info : undefined, 
    );
    const result = await collections.clients?.updateOne(query, { $set: updateJob });
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(`Successfully updated client with id ${id}`);
      } else {
        reject(new Error(`Client with id: ${id} not updated`));
      }
    });
  }

}

import { ObjectId } from "mongodb";
import { collections } from "../src/database/conn";

export default class Job {
  public title: string;
  public creation_date: Date;
  public creator_id: ObjectId;
  public owner_id: ObjectId;
  public timeline: Document;
  public employer_id: ObjectId;
  public pay_per_hour?: number;
  public address_id?: ObjectId;
  public description?: string;
  public type?: string;
  public expiry_date?: Date;
  
  constructor(title: string, creation_date: Date, creator_id: ObjectId, owner_id: ObjectId, 
    timeline: Document, employer_id: ObjectId, pay_per_hour?: number,address_id?: ObjectId, 
    description?: string, type?: string, expiry_date?: Date,
  ) {
    this.title = title;
    this.creation_date = creation_date;
    this.creator_id = creator_id;
    this.owner_id = owner_id;
    this.timeline = timeline;
    this.employer_id = employer_id;
    this.pay_per_hour = pay_per_hour;
    this.address_id = address_id;
    this.description = description;
    this.type = type;
    // need to autopopulate expiry_date based off a user config for how long default lifetime of a job lead is
    this.expiry_date = expiry_date;
  }

  static async getJobById(id: string) {
    const query = { _id: new ObjectId(id) };
    const job = (await collections.jobs?.findOne(query)) as unknown as Job;
    return new Promise((resolve, reject) => {
      if(job) {    
        resolve(job);  
      } else {    
        reject(new Error(`Unable to find matching job with id: ${id}`));  
      }
    });
  }

  static async createJob(newJobInfo: { 
    title: string; creation_date: string; creator_id: string; owner_id: string | undefined;
    timeline: string; employer_id: string; pay_per_hour: number | undefined; address_id: string | undefined;
    description: string | undefined; type: string | undefined; expiry_date: string | undefined;
  }) {
    const newJob = new Job(
      newJobInfo.title, 
      new Date(newJobInfo.creation_date), 
      new ObjectId(newJobInfo.creator_id),
      newJobInfo.owner_id ? new ObjectId(newJobInfo.owner_id) : new ObjectId(newJobInfo.creator_id),
      JSON.parse(JSON.stringify(newJobInfo.timeline)),
      new ObjectId(newJobInfo.employer_id),
      newJobInfo.pay_per_hour ? newJobInfo.pay_per_hour : undefined,
      newJobInfo.address_id ? new ObjectId(newJobInfo.address_id) : undefined, 
      newJobInfo.description ? newJobInfo.description : undefined,
      newJobInfo.type ? newJobInfo.type : undefined,
      newJobInfo.expiry_date ? new Date(newJobInfo.expiry_date) : undefined
    );
    const result = await collections.jobs?.insertOne(newJob);
    return new Promise((resolve, reject) => {
      if(result) {
        resolve(`Successfully created a new job with id ${result.insertedId}`);
      } else {
        reject(new Error("Failed to create a new job."));
      }
    });
  }
  
  static async deleteJob(id: string) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.jobs?.deleteOne(query);
    return new Promise((resolve, reject) => {
      if (result && result.deletedCount) {
        resolve(`Successfully removed job with id ${id}`);
      } else if (!result) {
        reject(new Error(`Failed to remove job with id ${id}`));
      } else if (!result.deletedCount) {
        reject(new Error(`Job with id ${id} does not exist`));
      }
    });
  }

  static async updateJob(id: string, updateJobInfo: { 
    title: string; creation_date: string; creator_id: string; owner_id: string | undefined;
    timeline: string; employer_id: string; pay_per_hour: number | undefined; address_id: string | undefined;
    description: string | undefined; type: string | undefined; expiry_date: string | undefined;
  }) {
    const query = { _id: new ObjectId(id) };
    const updateJob = new Job(
      updateJobInfo.title, 
      new Date(updateJobInfo.creation_date), 
      new ObjectId(updateJobInfo.creator_id),
      updateJobInfo.owner_id ? new ObjectId(updateJobInfo.owner_id) : new ObjectId(updateJobInfo.creator_id),
      JSON.parse(JSON.stringify(updateJobInfo.timeline)),
      new ObjectId(updateJobInfo.employer_id),
      updateJobInfo.pay_per_hour ? updateJobInfo.pay_per_hour : undefined,
      updateJobInfo.address_id ? new ObjectId(updateJobInfo.address_id) : undefined, 
      updateJobInfo.description ? updateJobInfo.description : undefined,
      updateJobInfo.type ? updateJobInfo.type : undefined,
      updateJobInfo.expiry_date ? new Date(updateJobInfo.expiry_date) : undefined
    );
    const result = await collections.jobs?.updateOne(query, { $set: updateJob });
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(`Successfully updated job with id ${id}`);
      } else {
        reject(new Error(`Job with id: ${id} not updated`));
      }
    });
  }
}
import { ObjectId } from "mongodb";
import {  collections } from "../src/database/conn";
export default class Employer {
    constructor(
        public name: string, 
        public primary_address_id: ObjectId,
        public contacts: Array<Object>, 
        public creator_id: ObjectId,
        public owner_id: ObjectId,
        public legal_name?: string, 
        public hr_contacts?: Array<Object>,
        public secondary_address_id?: ObjectId, 
        public initial_contact?: Date,
        public id?: ObjectId,
        public timeline?: Document
    ) {
        this.name = name;
        this.primary_address_id = primary_address_id;
        this.contacts = contacts;
        this.creator_id = creator_id;
        this.owner_id = owner_id;
        this.legal_name = legal_name;
        this.hr_contacts = hr_contacts;
        this.secondary_address_id = secondary_address_id;
        this.initial_contact = initial_contact;
        this.id = id;
        this.timeline = timeline;
    }

    static async getEmployer(id: string) {
        const query = { _id: new ObjectId(id) };
        const employer = (await collections.employer?.findOne(query)) as unknown as Employer;
        return new Promise((resolve, reject) => {
            if (employer) {
                resolve(employer);
            } else {
                reject(new Error(`Unable to find matching employer with id: ${id}`));  
            }
        }) 
    }
    static async createEmployer(newEmployer: Employer) {
        const result = await collections.employer?.insertOne(newEmployer);
        return new Promise((resolve, reject) => {
            if (result) {
                resolve(`Created an employer with id: ${result.insertedId}`);
            } else { 
                reject(new Error('Failed to create a new employer.'));
            }
        })
    }
}


import { ObjectId } from "mongodb";

export default class Job {
    constructor(
        public title: string,
        public creation_date: Date,
        public creator_id: ObjectId,
        public owner_id: ObjectId = creator_id,
        public timeline: Document,
        public employer_id: ObjectId,
        public pay_per_hour?: number,
        public address_id?: ObjectId,
        public description?: string,
        public type?: string,
        // autopopulate expiry_date based off a user config for how long default lifetime of a job lead is
        public expiry_date?: Date,
    ) {}
}
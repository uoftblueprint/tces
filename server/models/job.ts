import { ObjectId } from "mongodb";

// TODO: autopopulate expiry_date and owner_id on creation
export default class Job {
    constructor(
        public title: string,
        public creation_date: Date,
        public owner_id: ObjectId,
        public creator_id: ObjectId,
        public timeline: Document,
        public employer_id: ObjectId,
        public pay_per_hour?: number,
        public address_id?: ObjectId,
        public description?: string,
        public type?: string,
        public expiry_date?: Date,
    ) {}
}
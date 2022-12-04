import { ObjectId } from "mongodb";

export default class name {
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
    ) {}
}


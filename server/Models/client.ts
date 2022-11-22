import { ObjectId } from "mongodb";

export default class Client {
  constructor(
    public first_name: string,
    public last_name: string,
    public assignee_id: ObjectId,
    public date_created: Date,
    public id?: ObjectId,
    public phone_num?: string,
    public email?: string,
    public files?: Array<Object>
  ) {}
}

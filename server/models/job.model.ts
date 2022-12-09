import { ObjectId } from "mongodb";

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
  
  constructor(title: string, creation_date: Date, creator_id: ObjectId, owner_id: ObjectId = creator_id, 
    timeline: Document, employer_id: ObjectId,  pay_per_hour?: number,address_id?: ObjectId, 
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

    // getJobById() {
    //     return new Promise((resolve, reject) => {
    //       const query = `SELECT c.name, c.email, c.phone, u.street_name, 
    //       u.city, u.province, u.applicant_dob, u.curr_level 
    //       FROM client_users AS c INNER JOIN UserInfo AS u 
    //       ON c.user_id = u.user_id WHERE c.user_id = ?`;
    //       sql.query(query, [user_id], (err, userInfo) => {
    //         if (err) reject(err);
    //         else resolve(userInfo);
    //       });
    //     });
    // }

    // createJob() {
    //     return new Promise((resolve, reject) => {
        
    //     });
    // }
}
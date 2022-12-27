import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";


//TODO: Add your collections into here as you define them, then use them in your models
// See https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial for specifics
export const collections: { jobs?: mongoDB.Collection } = {};

const DB_CONN_STRING = process.env.DB_CONN_STRING || "mongodb://mongo:27017";
const DB_NAME = process.env.DB_NAME || "default_db_name";
const JOBS_COLLECTION_NAME = process.env.JOBS_COLLECTION_NAME || "default_jobs_collection_name";


export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(DB_CONN_STRING)

  await client.connect()

  const db = client.db(DB_NAME)

  //TODO: Apply schema validation
  console.log(
    `Successfully connected to database: ${db.databaseName}`,
  );

  const jobsCollection: mongoDB.Collection = db.collection(JOBS_COLLECTION_NAME);
  collections.jobs = jobsCollection;
  console.log(
    `Successfully connected to collection: ${jobsCollection.collectionName}`
  );

  await db.command({
    "collMod": JOBS_COLLECTION_NAME,
    "validator": jobSchema
  });
}

const jobSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["title", "creation_date", "creator_id", "owner_id", "timeline", "employer_id"],
    properties: {
      _id: {
        bsonType: "objectId",
        description: "'_id' is required and must be an ObjectId"
      },
      title: {
        bsonType: "string",
        description: "'title' is required and must be a String"
      },
      creation_date: {
        bsonType: "date",
        description: "'creation_date' is required and must be a Date"
      },
      creator_id: {
        bsonType: "objectId",
        description: "'creator_id' is required and must be an ObjectId"
      },
      owner_id: {
        bsonType: "objectId",
        description: "'owner_id' is required and must be an ObjectId"
      },
      timeline: {
        bsonType: "object",
        description: "'timeline' is required and must be an Object"
      },
      employer_id: {
        bsonType: "objectId",
        description: "'employer_id' is required and must be an ObjectId"
      },
      pay_per_hour: {
          bsonType: ["null", "number"],
          description: "'pay_per_hour' must be a Number"
      },
      address_id: {
        bsonType: ["null", "objectId"],
        description: "'address_id' must be an ObjectId"
      },
      description: {
        bsonType: ["null", "string"],
        description: "'description' must be a String"
      },
      type: {
        bsonType: ["null", "string"],
        description: "'type' must be a String"
      },
      expiry_date: {
        bsonType: ["null", "date"],
        description: "'expiry_date' must be a Date"
      }
    }
  }
}
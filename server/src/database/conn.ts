import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

//TODO: Add your collections into here as you define them, then use them in your models
// See https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial for specifics
export const collections: { clients?: mongoDB.Collection } = {};

const DB_CONN_STRING = process.env.DB_CONN_STRING || "mongodb://mongo:27017";
const DB_NAME = process.env.DB_NAME || "default_db_name";

const CLIENTS_COLLECTION_NAME =
  process.env.CLIENTS_COLLECTION_NAME || "default_clients_collection_name";

export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(DB_CONN_STRING)

  await client.connect()
  const db = client.db(DB_NAME)
  //TODO: Apply schema validation
  console.log(
    `Successfully connected to database: ${db.databaseName}`,
  );

  const clientsCollection: mongoDB.Collection = db.collection(CLIENTS_COLLECTION_NAME);
  collections.clients = clientsCollection;
  console.log(
    `Successfully connected to collection: ${clientsCollection.collectionName}`
  );

  await db.command({
    "collMod": CLIENTS_COLLECTION_NAME,
    "validator": clientSchema
  });
}

const clientSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["first_name", "last_name", "assignee_id", "date_created", "status"],
    properties: {
      _id: {
        bsonType: "objectId",
        description: "'_id' is required and must be an ObjectId"
      },
      first_name: {
        bsonType: "string",
        description: "'first_name' is required and must be a String"
      },
      last_name: {
        bsonType: "string",
        description: "'last_name' is required and must be a Date"
      },
      assignee_id: {
        bsonType: "objectId",
        description: "'assignee_id' is required and must be an ObjectId"
      },
      date_created: {
        bsonType: "date",
        description: "'owner_id' is required and must be an Date"
      },
      status: {
        bsonType: ["ACTIVE", "INACTIVE", "R&I", "CLOSED"],
        description: "'status' is required and must be one of the following: 'ACTIVE', 'INACTIVE', 'R&I', 'CLOSED'"
      },
      phone_num: {
        bsonType: "string",
        description: "'phone_num' must be an String"
      },
      email: {
          bsonType: "string",
          description: "'email' must be a String"
      },
      closure_info: {
        bsonType: "object",
        description: "'closure_info' must be a document with date_closed and closure_status",
        properties:{
          closure_status: {
          bsonType: "string",
          description: "'closure_status' must be a one of the following: 'EMPLOYED', 'EMPLOYED_AND_TRAINING', 'TRAINING', 'NO_RESULT'",
          },
          date_closed: {
            bsonType: "date",
            description: "'closure_info' must be Date",
          }
        }
      }
    }
  }
}
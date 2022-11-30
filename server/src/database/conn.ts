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

}


import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { clients?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const clientsCollection: mongoDB.Collection = db.collection(
    process.env.GAMES_COLLECTION_NAME
  );

  collections.clients = clientsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${clientsCollection.collectionName}`
  );
}

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { jobs?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
    
     // TODO: fix DB_CONN_STRING
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    // TODO: fix GAMES_COLLETION_NAME
    const jobsCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);
    
    collections.jobs = jobsCollection;
    
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${jobsCollection.collectionName}`);
 }
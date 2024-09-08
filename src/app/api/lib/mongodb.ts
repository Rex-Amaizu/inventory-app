import { MongoClient } from "mongodb";
import { mongoUri, environment } from "@/app/api/config/keys";

if (!mongoUri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = mongoUri;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (environment === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

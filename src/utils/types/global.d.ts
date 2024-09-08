import { MongoClient } from "mongodb";

declare global {
  // Adding the _mongoClientPromise property to the global object
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI environment variable.");
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (client && db) {
    return { client, db };
  }

  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  let clientPromise: Promise<MongoClient>;

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri!);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri!);
    clientPromise = client.connect();
  }

  client = await clientPromise;
  db = client.db();

  return { client, db };
}

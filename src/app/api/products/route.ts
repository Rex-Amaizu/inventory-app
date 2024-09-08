import { NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";
import { dbName } from "@/app/api/config/keys";
import { ProductWithInventory } from "../lib/models/Product";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection<ProductWithInventory>("products");

  const products = await productsCollection.find({}).toArray();

  return NextResponse.json(products);
}

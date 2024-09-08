import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";
import { dbName } from "@/app/api/config/keys";
import { ProductWithInventory } from "../lib/models/Product";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db(dbName);
  // Set cache control headers using NextResponse
  const response = NextResponse.json({});

  response.headers.set("Cache-Control", "no-store");
  const productsCollection = db.collection<ProductWithInventory>("products");

  const products = await productsCollection.find({}).toArray();

  revalidateTag("products");

  return NextResponse.json(products);
}

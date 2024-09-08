import { NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";
import { dbName } from "@/app/api/config/keys";
import { ProductWithInventory } from "../lib/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(dbName);
  // Set cache control headers
  res.setHeader("Cache-Control", "no-store");
  const productsCollection = db.collection<ProductWithInventory>("products");

  const products = await productsCollection.find({}).toArray();
  revalidateTag("products");

  return NextResponse.json(products);
}

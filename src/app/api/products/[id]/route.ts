import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Product } from "../../lib/models/Product";
import { dbName } from "@/app/api/config/keys";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection<Product>("products");

  const id = params.id;

  const product = await productsCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

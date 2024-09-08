import { NextResponse } from "next/server";
import clientPromise from "@/app/api/lib/mongodb";
import { ObjectId } from "mongodb";
import { Product } from "@/app/api/lib/models/Product";
import { dbName } from "@/app/api/config/keys";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection<Product>("products");

  const body = await request.json();
  const id = params.id;

  const updatedProduct = await productsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: body },
    { returnDocument: "after" }
  );

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: 200,
    message: "Product Updated Successfully!",
    updatedProduct,
  });
}

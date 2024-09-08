import { NextResponse } from "next/server";
import clientPromise from "@/app/api/lib/mongodb";
import { ObjectId } from "mongodb";
import { dbName } from "@/app/api/config/keys";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection("products");

  const id = params.id;

  const deletedProduct = await productsCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (!deletedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  revalidateTag("products");

  return NextResponse.json({
    status: 200,
    message: "Product Deleted Successfully!",
    deletedProduct,
  });
}

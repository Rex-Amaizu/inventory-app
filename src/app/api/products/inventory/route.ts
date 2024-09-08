import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { InventoryChange, Product, StockData } from "../../lib/models/Product";
import { dbName } from "@/app/api/config/keys";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection<Product>("products");

  const body = await request.json();

  const { productId, change, changeStatus, inStock } = body;

  // Ensure productId is a valid ObjectId string
  if (!ObjectId.isValid(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  // Create a new inventory entry
  const newInventoryEntry: InventoryChange = {
    productId,
    change,
    changeStatus,
    timestamp: new Date(),
    inStock,
  };

  // Update the product document by pushing the new inventory entry to the inventory array
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { inventory: newInventoryEntry } }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }

  const stockBody: StockData = {
    stock: inStock,
  };

  await productsCollection.findOneAndUpdate(
    { _id: new ObjectId(productId) },
    { $set: stockBody },
    { returnDocument: "after" }
  );

  // Fetch the inserted document using the insertedId
  const insertedProduct = await productsCollection.findOne({
    _id: new ObjectId(productId),
  });

  return NextResponse.json({
    status: 200,
    message: "Inventory updated successfully!",
    insertedProduct,
  });
}

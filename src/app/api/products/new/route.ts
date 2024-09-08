import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { InventoryChange, Product } from "../../lib/models/Product";
import { dbName } from "@/app/api/config/keys";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function POST(request: Request, response: Response) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const productsCollection = db.collection<Product>("products");

  const body = await request.json();

  // Function to create a new inventory entry
  const createInventoryEntry = (
    productId: string,
    change: number,
    changeStatus: string,
    inStock: number
  ): InventoryChange => {
    return {
      productId,
      change,
      changeStatus,
      timestamp: new Date(), // Set to current date and time
      inStock,
    };
  };

  const newProduct: Product = {
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
  };

  const result = await productsCollection.insertOne(newProduct);

  // Fetch the inserted document using the insertedId
  const insertedProduct = await productsCollection.findOne({
    _id: result.insertedId,
  });

  if (insertedProduct) {
    const new_id = insertedProduct._id.toString();
    const change = insertedProduct.stock;
    const changeStatus = "positive";
    const newInventory = createInventoryEntry(
      new_id,
      change,
      changeStatus,
      change
    );

    // Push the new inventory change to the inventory array
    await productsCollection.updateOne(
      { _id: new ObjectId(new_id) },
      { $push: { inventory: newInventory } } // Use $push to add the subdocument to an array
    );

    // Fetch the inserted document using the insertedId
    const finalProduct = await productsCollection.findOne({
      _id: insertedProduct._id,
    });

    revalidateTag("products");

    return NextResponse.json({
      status: 200,
      message: "Product Created Successfully!",
      finalProduct,
    });
  }
}

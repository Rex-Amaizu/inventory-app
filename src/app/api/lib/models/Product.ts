import { ObjectId } from "mongodb";

export interface InventoryChange {
  productId: string;
  change: number;
  changeStatus: string;
  timestamp: Date;
  inStock: number;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export type StockData = Pick<Product, "stock">;

export interface ProductWithInventory extends Product {
  inventory: InventoryChange[];
}

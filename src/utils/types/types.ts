export interface InventoryChange {
  productId: string;
  change: number;
  changeStatus: string;
  inStock: number;
  timestamp: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export type InventoryPost = Omit<InventoryChange, "timestamp">;

export type ProductPost = Omit<Product, "_id">;

export type InventoryData = Pick<Product, "_id" | "stock">;

export interface ProductWithInventory extends Product {
  inventory: InventoryChange[];
}

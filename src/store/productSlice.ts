import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  InventoryChange,
  InventoryPost,
  Product,
  ProductWithInventory,
} from "@/utils/types/types";
import { ProductPost } from "@/utils/types/types";

interface ProductState {
  products: ProductWithInventory[];
  inventoryHistory: InventoryChange[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  inventoryHistory: [],
  loading: false,
  error: null,
};

// Fetch products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Cache-Control": "no-store", // Ensure no caching
      },
      cache: "no-store", // Disable Next.js fetch caching
    });
    const products = await response.json();
    // Return products with inventory as is from the API
    return products as ProductWithInventory[];
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: ProductPost) => {
    const response = await fetch("/api/products/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const product = (await response.json()) as ProductWithInventory;
    return product; // Return the new product with its inventory
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Partial<Product> & { _id: string }) => {
    const { _id, ...productWithoutId } = product;
    const response = await fetch(`/api/products/update/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
      body: JSON.stringify(productWithoutId),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to update product");
    }
    const updatedProduct = (await response.json()) as ProductWithInventory;
    return updatedProduct; // Return the updated product with its inventory
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    await fetch(`/api/products/delete/${id}`, {
      method: "DELETE",
    });
    return id; // Return the ID of the deleted product
  }
);

// Update product inventory
export const updateInventory = createAsyncThunk(
  "products/updateInventory",
  async (inventoryData: InventoryPost) => {
    const response = await fetch(`/api/products/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to update inventory");
    }
    const insertedProduct = (await response.json()) as ProductWithInventory;
    return insertedProduct; // Return the product with updated inventory
  }
);

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Update products with fetched data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add the new product with inventory
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload; // Update existing product with inventory
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload // Remove deleted product
        );
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload; // Update product with new inventory
        }
      });
  },
});

export default productSlice.reducer;

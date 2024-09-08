"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/home/HomePage.module.css";
import { CiSearch } from "react-icons/ci";
import ProductBody from "../products/ProductBody";
import { ProductWithInventory } from "@/utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productSlice";
import { AppDispatch, RootState } from "@/store";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [filteredProducts, setFilteredProducts] =
    useState<ProductWithInventory[]>(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const results = products.filter((product) => {
      // Check if product.name is defined and is a string
      return (
        product?.name &&
        product?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (loading)
    return (
      <p className="w-full flex items-center justify-center">Loading...</p>
    );
  if (error)
    return <p className="w-full flex items-center justify-center">{error}</p>;
  return (
    <div className={styles.container}>
      <label>Home Page</label>
      <div className={styles.searchDiv}>
        <div className={styles.searchBox}>
          <CiSearch
            style={{ width: "20px", height: "20px", color: "#8c8c8c" }}
          />
          <input
            placeholder="Search Products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button>Products</button>
      </div>
      <ProductBody page="home" products={filteredProducts} />
    </div>
  );
};

export default HomePage;

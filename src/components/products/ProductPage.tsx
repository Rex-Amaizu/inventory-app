"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/products/ProductPage.module.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import ProductBody from "./ProductBody";
import AddProductModal from "../global/modal/modal-designs/AddProductModal";
import { ProductWithInventory } from "@/utils/types/types";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productSlice";

const ProductPage = () => {
  const [addProductModal, setAddProductModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [trigger, setTrigger] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [filteredProducts, setFilteredProducts] =
    useState<ProductWithInventory[]>(products);

  const handleAction = () => {
    setTrigger((prev) => !prev); // Toggle trigger state
  };

  const openModal = () => {
    setAddProductModal(true);
  };

  const closeModal = () => {
    setAddProductModal(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, trigger]);

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

  if (error) return <p>{error}</p>;
  return (
    <div className={styles.container}>
      <label>Product Page</label>
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
        <button onClick={openModal}>
          <FaPlus />
          Add Product
        </button>
      </div>
      <ProductBody
        page="products"
        products={filteredProducts}
        handleAction={handleAction}
      />
      <AddProductModal
        isOpen={addProductModal}
        onClose={closeModal}
        handleAction={handleAction}
      />
    </div>
  );
};

export default ProductPage;

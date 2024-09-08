import React from "react";
import type { ProductWithInventory } from "@/utils/types/types";
import ProductHeader from "../products/ProductHeader";
import Product from "../products/Product";
import styles from "@/styles/inventory/InventoryManager.module.css";

interface Props {
  page: string;
  products: ProductWithInventory[];
  handleAction?: () => void;
}

const InventoryManager = ({ page, products, handleAction }: Props) => {
  return (
    <div className={styles.container}>
      <ProductHeader />
      {products.map((p, index) => (
        <div key={p._id} className={styles.productDiv}>
          <Product
            page={page}
            key={p._id}
            _id={p._id}
            sn={index + 1}
            name={p.name}
            description={p.description}
            price={p.price}
            stock={p.stock}
            inventory={p.inventory || []}
            handleAction={handleAction}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InventoryManager;

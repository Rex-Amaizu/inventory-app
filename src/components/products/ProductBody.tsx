import React from "react";
import styles from "@/styles/products/ProductBody.module.css";
import ProductHeader from "./ProductHeader";
import Product from "./Product";
import type { ProductWithInventory } from "@/utils/types/types";

interface Props {
  page: string;
  products: ProductWithInventory[];
  handleAction?: () => void;
}

const ProductBody = ({ page, products, handleAction }: Props) => {
  return (
    <div className={styles.container}>
      <ProductHeader />
      {products.map((p, index) => (
        <div className={styles.productDiv} key={p._id}>
          <Product
            page={page}
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

export default ProductBody;

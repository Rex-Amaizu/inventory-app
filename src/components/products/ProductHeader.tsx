import React from "react";
import styles from "@/styles/products/ProductHeader.module.css";

const ProductHeader = () => {
  return (
    <div className={styles.header}>
      <div className="flex justify-self-start w-[20px] sm:w-[30px] ms:w-[50px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        S/N
      </div>
      <div className="flex justify-self-start w-[40px] sm:w-[50px] ms:w-[80px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        Name
      </div>
      <div className="flex justify-self-start w-[80px] sm:w-[120px] ms:w-[160px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        Description
      </div>
      <div className="flex justify-self-start w-[30px] ms:w-[50px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        Price
      </div>
      <div className="flex justify-self-start w-[30px] ms:w-[50px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        Stock
      </div>
      <div className="flex justify-self-start w-[50px] sm:w-[80px] ms:w-[100px] font-medium text-white text-[6px] sm:text-[8px] ms:text-xs md:text-sm">
        Actions
      </div>
    </div>
  );
};

export default ProductHeader;

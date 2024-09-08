import React from "react";
import styles from "@/styles/global/modal/InventoryListModal.module.css";

const InventoryHeader = () => {
  return (
    <div className={styles.header}>
      <div className="flex justify-self-start w-[30px] smd:w-[70px] font-semibold smd:font-medium text-white text-[10px] smd:text-sm">
        S/N
      </div>
      <div className="flex justify-self-start w-[50px] smd:w-[70px] font-semibold smd:font-medium text-white text-[10px] smd:text-sm">
        Change
      </div>
      <div className="flex justify-self-start w-[50px] smd:w-[70px] font-semibold smd:font-medium text-white text-[10px] smd:text-sm">
        InStock
      </div>
      <div className="flex justify-self-start w-[80px] smd:w-[140px] font-semibold smd:font-medium text-white text-[10px] smd:text-sm">
        Date
      </div>
    </div>
  );
};

export default InventoryHeader;

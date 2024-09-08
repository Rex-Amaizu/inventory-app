import React from "react";
import styles from "@/styles/global/modal/InventoryListModal.module.css";
import { formatDate } from "@/utils/formateDate";

interface InventoryProps {
  id: string;
  change: number;
  changeStatus: string;
  inStock: number;
  sn: number;
  date: Date;
}

const InventoryList = ({
  id,
  change,
  changeStatus,
  inStock,
  sn,
  date,
}: InventoryProps) => {
  console.log("date", date);
  return (
    <div
      className={
        changeStatus === "positive"
          ? styles.inventoryListAdd
          : styles.inventoryListRemove
      }
    >
      <div className="flex justify-self-start w-[30px] smd:w-[70px] font-semibold smd:font-medium text-black text-[8px] smd:text-xs">
        {sn}
      </div>

      <div className="flex justify-self-start w-[50px] smd:w-[70px] font-semibold smd:font-medium text-black text-[8px] smd:text-xs">
        {changeStatus === "negative" ? -change : change}
      </div>

      <div className="flex justify-self-start w-[50px] smd:w-[70px] font-semibold smd:font-medium text-black text-[8px] smd:text-xs">
        {inStock}
      </div>

      <div className="flex justify-self-start w-[80px] smd:w-[140px] font-semibold smd:font-medium text-black text-[8px] smd:text-xs">
        {formatDate(date.toString())}
      </div>
    </div>
  );
};

export default InventoryList;

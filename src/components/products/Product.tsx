"use client";
import React, { useState } from "react";
import styles from "@/styles/products/Product.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import EditProductModal from "../global/modal/modal-designs/EditProductModal";
import type {
  InventoryChange,
  InventoryData,
  Product,
} from "@/utils/types/types";
import InventoryModal from "../global/modal/modal-designs/InventoryModal";
import InventoryListModal from "../global/modal/modal-designs/InventoryListModal";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  page: string;
  inventory: InventoryChange[];
  sn: number;
  handleAction?: () => void;
}

const Product: React.FC<ProductProps> = ({
  _id,
  name,
  description,
  price,
  stock,
  page,
  inventory,
  handleAction,
  sn,
}) => {
  const [editProductModal, setEditProductModal] = useState<boolean>(false);
  const [viewInventoryModal, setViewInventoryModal] = useState<boolean>(false);
  const [viewInventoryListModal, setViewInventoryListModal] =
    useState<boolean>(false);

  const inventoryData: InventoryData = {
    _id: _id,
    stock: stock,
  };

  const editData: Product = {
    _id: _id,
    name: name,
    description: description,
    price: price,
    stock: stock,
  };

  const openEditModal = () => {
    setEditProductModal(true);
  };

  const closeEditModal = () => {
    setEditProductModal(false);
  };

  const openInventoryModal = () => {
    setViewInventoryModal(true);
  };

  const closeInventoryModal = () => {
    setViewInventoryModal(false);
  };

  const openInventoryListModal = () => {
    setViewInventoryListModal(true);
  };

  const closeInventoryListModal = () => {
    setViewInventoryListModal(false);
  };

  return (
    <div className={styles.container}>
      <div className="flex justify-self-start w-[20px] sm:w-[30px] ms:w-[50px] font-bold ms:font-medium text-black text-[7px] ms:text-[10px] md:text-xs">
        {sn}
      </div>
      <hr />
      <div className="flex justify-self-start w-[50px] sm:w-[50px] ms:w-[80px] font-bold ms:font-medium text-black text-[7px] ms:text-[10px] md:text-xs">
        {name}
      </div>
      <hr />
      <div className="flex justify-self-start w-[80px] sm:w-[120px] ms:w-[160px] font-bold ms:font-medium text-black text-[7px] ms:text-[10px] md:text-xs">
        {description}
      </div>
      <hr />
      <div className="flex justify-self-start w-[30px] ms:w-[50px] font-bold ms:font-medium text-black text-[7px] ms:text-[10px] md:text-xs">
        ${price}
      </div>
      <hr />
      <div className="flex justify-self-start w-[30px] ms:w-[50px] font-bold ms:font-medium text-black text-[7px] ms:text-[10px] md:text-xs">
        {stock}
      </div>
      <hr />
      {page === "home" && (
        <div
          onClick={openInventoryListModal}
          className="flex justify-self-start items-center justify-center cursor-pointer w-[60px] sm:w-[80px] ms:w-[100px] h-5 sm:h-[30px] ms:h-[40px] rounded bg-[#6d31edff] font-bold ms:font-medium text-white text-[7px] ms:text-[10px] md:text-xs"
        >
          View Inventory
        </div>
      )}
      {page === "products" && (
        <HiOutlineDotsHorizontal
          onClick={openEditModal}
          className="flex justify-self-start w-[60px] sm:w-[80px] ms:w-[100px] h-[30px] ms:h-[40px] cursor-pointer font-bold ms:font-medium text-[#6d31edff] text-[7px] ms:text-[10px] md:text-xs"
        />
      )}
      {page === "inventory" && (
        <HiOutlineDotsHorizontal
          onClick={openInventoryModal}
          className="flex justify-self-start w-[60px] sm:w-[80px] ms:w-[100px] h-[30px] ms:h-[40px] cursor-pointer font-bold ms:font-medium text-[#6d31edff] text-[7px] ms:text-[10px] md:text-xs"
        />
      )}
      <EditProductModal
        isOpen={editProductModal}
        onClose={closeEditModal}
        editData={editData}
        handleAction={handleAction}
      />
      <InventoryModal
        isOpen={viewInventoryModal}
        onClose={closeInventoryModal}
        inventoryData={inventoryData}
        handleAction={handleAction}
      />
      <InventoryListModal
        isOpen={viewInventoryListModal}
        onClose={closeInventoryListModal}
        viewData={inventory}
      />
    </div>
  );
};

export default Product;

import React from "react";
import Modal from "../Modal";
import styles from "@/styles/global/modal/InventoryListModal.module.css";
import { InventoryChange } from "@/utils/types/types";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryList from "@/components/inventory/InventoryList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewData: InventoryChange[];
}

const InventoryListModal = ({ isOpen, onClose, viewData }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <label>Inventory List</label>
        <InventoryHeader />
        {viewData.map((inventory, index) => (
          <InventoryList
            key={inventory.productId}
            id={inventory.productId}
            change={inventory.change}
            changeStatus={inventory.changeStatus}
            inStock={inventory.inStock}
            date={inventory.timestamp}
            sn={index}
          />
        ))}
      </div>
    </Modal>
  );
};

export default InventoryListModal;

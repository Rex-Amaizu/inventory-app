import React, { useState } from "react";
import Modal from "../Modal";
import styles from "@/styles/global/modal/InventoryModal.module.css";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { InventoryData, InventoryPost } from "@/utils/types/types";
import { updateInventory } from "@/store/productSlice";
import UpdateSuccessModal from "./UpdateSuccessModal";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryData: InventoryData;
  handleAction?: () => void;
}

const InventoryModal = ({
  isOpen,
  onClose,
  inventoryData,
  handleAction,
}: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const isQuantityValid = () => {
    if (
      quantity === null ||
      quantity === undefined ||
      isNaN(quantity) ||
      quantity === 0
    ) {
      toast("Please enter a valid stock quantity.");
      return false;
    }
    return true;
  };

  const remove = async () => {
    if (!isQuantityValid()) return;
    setIsLoading(true);

    const inStock = inventoryData?.stock - quantity;
    const id = inventoryData?._id;

    const payload: InventoryPost = {
      productId: id,
      change: quantity,
      changeStatus: "negative",
      inStock: inStock,
    };
    try {
      await dispatch(updateInventory(payload));
      setMessage("Inventory Change Successful!");
      resetForm();
      onClose();
      setOpenSuccessModal(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const add = async () => {
    if (!isQuantityValid()) return;
    setIsLoading(true);

    const inStock = inventoryData?.stock + quantity;
    const id = inventoryData?._id;

    const payload: InventoryPost = {
      productId: id,
      change: quantity,
      changeStatus: "positive",
      inStock: inStock,
    };
    try {
      await dispatch(updateInventory(payload));
      setIsLoading(false);
      setMessage("Inventory Change Successful!");
      resetForm();
      onClose();
      setOpenSuccessModal(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
    }
  };

  const resetForm = () => {
    setQuantity(0);
  };

  const closeModal = () => {
    setOpenSuccessModal(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {isLoading && (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "#6d31edff" }} />
          </Stack>
        )}
        {!isLoading && (
          <div className={styles.container}>
            <label>Manage Inventory</label>

            <div className={styles.formDiv}>
              <input
                placeholder={inventoryData?.stock.toString()}
                type="number"
                name="quantity"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <div className={styles.buttonDiv}>
                <div className={styles.removeButton}>
                  <button onClick={remove}>Remove Stock</button>
                </div>
                <div className={styles.addButton}>
                  <button onClick={add}>Add Stock</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <UpdateSuccessModal
        isOpen={openSuccessModal}
        onClose={closeModal}
        message={message}
        handleAction={handleAction}
      />
    </>
  );
};

export default InventoryModal;

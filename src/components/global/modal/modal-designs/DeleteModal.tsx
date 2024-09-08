import React, { useState } from "react";
import Modal from "../Modal";
import { FaTrash } from "react-icons/fa6";
import styles from "@/styles/global/modal/DeleteModal.module.css";
import { deleteProduct } from "@/store/productSlice";
import { CircularProgress, Stack } from "@mui/material";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteId: string;
}

const DeleteModal = ({ isOpen, onClose, deleteId }: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const deleteItem = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteProduct(deleteId));

      setIsLoading(false);
      onClose();
      toast("Product Deleted!");
    } catch (error) {
      console.log(error);
      alert(error);
      setIsLoading(false);
    }
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
            <FaTrash style={{ width: "20px", height: "20px", color: "red" }} />
            <label>You are about to delete a product</label>
            <p>
              This will remove the article from your system. Are you sure you
              want to proceed?
            </p>
            <div className={styles.buttonDiv}>
              <div className={styles.cancelButton}>
                <button onClick={onClose}> Cancel</button>
              </div>
              <div className={styles.deleteButton}>
                <button onClick={deleteItem}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DeleteModal;

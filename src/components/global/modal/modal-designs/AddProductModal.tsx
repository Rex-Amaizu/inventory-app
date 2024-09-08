"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import styles from "@/styles/global/modal/AddProductModal.module.css";
import { addProduct } from "@/store/productSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { CircularProgress, Stack } from "@mui/material";
import AddSuccessModal from "./AddSuccessModal";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAction: () => void;
}

const AddProductModal = ({ isOpen, onClose, handleAction }: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const validateInputs = () => {
    if (!name || !description || price <= 0 || stock < 0) {
      toast("Please fill out all fields correctly.");
      return false;
    }
    return true;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateInputs()) {
      return;
    }
    const payload = {
      name: name,
      description: description,
      price: price,
      stock: stock,
    };
    try {
      await dispatch(addProduct(payload));
      resetForm();
      setIsLoading(false);
      onClose();
      setOpenSuccessModal(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
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
            <label>Add Product</label>
            <form className={styles.formDiv} onSubmit={submit}>
              <div className={styles.formDiv}>
                <div className={styles.formBody}>
                  <h2>Name</h2>
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.textArea}>
                  <h2>Description</h2>
                  <textarea
                    placeholder="Enter Comment"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={styles.formBody}>
                  <h2>Price</h2>
                  <input
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={price > 0 ? price : ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className={styles.formBody}>
                  <h2>Stock</h2>
                  <input
                    placeholder="Stock"
                    type="number"
                    name="stock"
                    value={stock > 0 ? stock : ""}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                </div>
                <button>Add Product</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
      <AddSuccessModal
        isOpen={openSuccessModal}
        onClose={closeModal}
        message="Product Created!"
        handleAction={handleAction}
      />
    </>
  );
};

export default AddProductModal;

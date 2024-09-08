"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import styles from "@/styles/global/modal/EditProductModal.module.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateProduct } from "@/store/productSlice";
import { CircularProgress, Stack } from "@mui/material";
import { Product, ProductPost } from "@/utils/types/types";
import DeleteModal from "./DeleteModal";
import UpdateSuccessModal from "./UpdateSuccessModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData: Product;
  handleAction?: () => void;
}

const EditProductModal = ({
  isOpen,
  onClose,
  editData,
  handleAction,
}: ModalProps) => {
  const [productName, setProductName] = useState<string>(editData.name);
  const [productDescription, setProductDescription] = useState<string>(
    editData.description
  );
  const [productPrice, setProductPrice] = useState<number>(editData.price);
  const [productStock, setProductStock] = useState<number>(editData.stock);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Initialize the payload with _id and any fields that have changed
    let payload: Partial<ProductPost> & { _id: string } = {
      _id: editData?._id || "",
    };

    if (productName !== editData?.name) payload.name = productName;
    if (productDescription !== editData?.description)
      payload.description = productDescription;
    if (productPrice !== editData?.price) payload.price = productPrice;
    if (productStock !== editData?.stock) payload.stock = productStock;

    try {
      const res = await dispatch(updateProduct(payload));
      if (res) {
        setMessage("Product Updated!");
        setIsLoading(false);
        onClose();
        setOpenSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setOpenSuccessModal(false);
  };

  const showConfirmModal = () => {
    setConfirmModal(true);
  };
  const closeConfirmModal = () => {
    setConfirmModal(false);
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
            <label>Edit Product</label>
            <div onClick={showConfirmModal} className={styles.deleteDiv}>
              <MdDeleteForever
                style={{ width: "20px", height: "20px", color: "black" }}
              />
              <h1>Delete Product</h1>
            </div>
            <div className={styles.updateDiv}>
              <FaEdit
                style={{ width: "20px", height: "20px", color: "white" }}
              />
              <h1>Edit Product</h1>
            </div>
            <h5 className="font-normal text-xs text-[#8c8c8c]">
              Edit only the necessary fields
            </h5>
            <form className={styles.formDiv} onSubmit={submit}>
              <div className={styles.formDiv}>
                <div className={styles.formBody}>
                  <h2>Name</h2>
                  <input
                    placeholder={productName}
                    type="text"
                    name="productName"
                    value={productName == editData?.name ? "" : productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className={styles.textArea}>
                  <h2>Description</h2>
                  <textarea
                    placeholder={productDescription}
                    name="productDescription"
                    value={
                      productDescription == editData?.description
                        ? ""
                        : productDescription
                    }
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
                <div className={styles.formBody}>
                  <h2>Price</h2>
                  <input
                    placeholder={productPrice?.toString()}
                    type="number"
                    name="productPrice"
                    value={productPrice == editData?.price ? "" : productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                  />
                </div>
                <button>Save</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
      <DeleteModal
        isOpen={confirmModal}
        onClose={closeConfirmModal}
        deleteId={editData?._id}
      />
      <UpdateSuccessModal
        isOpen={openSuccessModal}
        onClose={closeModal}
        message={message}
        handleAction={handleAction}
      />
    </>
  );
};

export default EditProductModal;

import React from "react";
import styles from "@/styles/global/modal/SuccessModal.module.css";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  handleAction: () => void;
}

const AddSuccessModal = ({
  isOpen,
  onClose,
  message,
  handleAction,
}: ModalProps) => {
  const closeSuccess = () => {
    onClose();
    handleAction();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <FaCheckCircle
          style={{ width: "40px", height: "40px", color: "green" }}
        />
        <label>{message}</label>
        <button onClick={closeSuccess}>Okay</button>
      </div>
    </Modal>
  );
};

export default AddSuccessModal;

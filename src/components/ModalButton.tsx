"use client";

import { useState } from "react";
import Modal from "./Modal";

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="mt-6 text-center">
        <button onClick={openModal} className="text-blue-600 hover:underline">
          Important Note
        </button>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default ModalButton;

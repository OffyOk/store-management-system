"use client";
import { useState } from "react";
import AlertModal from "../AlertModal";

export default function DelButton() {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // Perform delete action here
    // alert("Item deleted!");
    setShowModal(false);
  };

  const activeModal = () => {};
  return (
    <>
      <button
        className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100"> */}
      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {/* </div> */}
    </>
  );
}

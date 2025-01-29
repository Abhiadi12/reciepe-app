import React from "react";
import { Modal } from "../components/common";
import AddRecipeForm from "../components/recipe/AddRecipe";

function Test() {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleShowModal}>Show Modal</button>
      <Modal
        modalOpen={showModal}
        setModalOpen={setShowModal}
        cstmStyle="w-full max-w-2xl"
      >
        <AddRecipeForm />
      </Modal>
    </div>
  );
}

export default Test;

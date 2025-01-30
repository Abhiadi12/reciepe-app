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
    <div>
      {/* learn tailwind grid */}
      <div className="flex flex-row gap-4">
        <div className="basis-[100%] md:basis-2/3 bg-blue-500">01</div>
        <div className="basis-[100%] md:basis-1/3  bg-blue-500">02</div>
      </div>
    </div>
  );
}

export default Test;

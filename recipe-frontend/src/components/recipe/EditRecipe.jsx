import React, { memo } from "react";
import ShimmerForm from "./ShimmerForm";
import AddRecipe from "./AddRecipe";

function EditRecipe({ product, loading, handleHideModal, fetchData }) {
  if (loading) return <ShimmerForm />;
  const getRecipeInformation = () => {
    return {
      title: product?.title,
      description: product?.description,
      ingredients: product?.ingredients?.map((ingredient) => ingredient._id),
      steps: product?.steps,
      prepTime: product?.prepTime,
      file: product?.image,
    };
  };

  return (
    <div>
      <AddRecipe
        defaultValues={getRecipeInformation()}
        handleHideModal={handleHideModal}
        fetchData={fetchData}
        isEdit={true}
        id={product?._id}
      />
    </div>
  );
}

export default memo(EditRecipe);

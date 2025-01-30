import React from "react";

const ProductCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      {/* Recipe Image */}
      <img
        src={recipe?.image?.url}
        alt={recipe?.title}
        className="w-full h-48 object-cover rounded-lg aspect-video"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold mt-4">{recipe?.title}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-2">{recipe?.description}</p>

      {/* Ingredients as Chips */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">Ingredients</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {recipe?.ingredients?.map((ingredient, index) => (
            <span
              key={ingredient._id}
              className="px-2 py-1 bg-black text-background rounded-full text-sm"
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      </div>

      {/* Steps as Ordered List */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">Steps</h3>
        <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
          {recipe?.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {/* prep time */}
      <div className="mt-4 flex items-center">
        <span className="text-lg font-medium mr-2">Prep Time:</span>
        <span className="text-gray-600">{recipe?.prepTime} mins</span>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center">
        <span className="text-lg font-medium mr-2">Rating:</span>
        <span className="text-yellow-500 text-xl">{"★".repeat(5)}</span>
      </div>

      {/* created by */}
      <div className="mt-4 flex items-center">
        <span className="text-lg font-medium mr-2">Created By:</span>
        <span className="text-gray-600">{recipe?.createdBy?.username}</span>
      </div>
    </div>
  );
};

export default ProductCard;

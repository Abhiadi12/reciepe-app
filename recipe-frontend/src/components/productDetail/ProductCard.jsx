import React from "react";

const ProductCard = ({ recipe }) => {
  return (
    <div className="bg-card p-4 w-full">
      {/* Recipe Image */}
      <img
        src={recipe?.image?.url}
        alt={recipe?.title}
        className="w-full h-[50vh]  rounded-lg aspect-video"
      />

      {/* Title */}
      <h2 className="text-xl text-primary font-semibold mt-2">
        {recipe?.title}
      </h2>

      {/* Description */}
      <p className="text-muted-foreground mt-2">{recipe?.description}</p>

      {/* Ingredients as Chips */}
      <div className="mt-2">
        <h3 className="text-lg text-primay font-medium">Ingredients</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {recipe?.ingredients?.map((ingredient, index) => (
            <span
              key={ingredient._id}
              className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-sm"
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      </div>

      {/* Steps as Ordered List */}
      <div className="mt-2">
        <h3 className="text-lg font-medium text-primary">Steps</h3>
        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
          {recipe?.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {/* prep time */}
      <div className="mt-2 flex items-center">
        <span className="text-lg font-medium mr-2 text-primary">
          Prep Time:
        </span>
        <span className="text-muted-foreground">{recipe?.prepTime} mins</span>
      </div>

      {/* created by */}
      <div className="mt-2 flex items-center">
        <span className="text-lg font-medium mr-2 text-primary">
          Created By:
        </span>
        <span className="text-muted-foreground">
          {recipe?.createdBy?.username}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;

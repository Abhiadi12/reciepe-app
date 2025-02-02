import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

function RecipeCard({
  title,
  description,
  imageUrl,
  prepTime,
  ratings,
  ingredients,
  id,
}) {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:scale-105 shadow-lg rounded-lg">
      <Link to={`/product/${id}`} className="block relative">
        <img
          className="rounded-t-lg w-full aspect-video object-cover"
          src={imageUrl}
          alt={title}
        />
      </Link>

      <div className="p-4 flex flex-col gap-3">
        <Link to={`/product/${id}`}>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 hover:text-primary transition-colors">
            {title}
          </h5>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2">
          {ingredients?.map((ingredient) => (
            <span
              key={ingredient._id}
              className="px-3 py-1 bg-gray-800 text-white rounded-full text-xs font-medium"
            >
              {ingredient.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="font-medium">⏳ {prepTime} mins</span>
          <span className="font-medium">⭐ {ratings.length} ratings</span>
        </div>
      </div>
    </Card>
  );
}

export default RecipeCard;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

import Card from "../common/Card";

function RecipeCard({
  title,
  description,
  imageUrl,
  prepTime,
  ratings,
  ingedients,
  id,
}) {
  return (
    <div>
      <Card>
        <Link to={`/product/${id}`}>
          <img
            className="rounded-t-lg w-full aspect-video"
            src={imageUrl}
            alt="recipe"
          />
        </Link>

        <div className="p-4 flex flex-col gap-2">
          <Link to={`/product/${id}`}>
            <h5 className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </h5>
          </Link>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            {ingedients?.map((ingredient) => (
              <span
                key={ingredient._id}
                className="px-2 py-1 bg-black text-background rounded-full text-sm"
              >
                {ingredient.name}
              </span>
            ))}
          </div>
          <p className="text-2xl text-muted-foreground">
            Time to prepare: {prepTime} mins
          </p>
          <p className="text-2xl text-muted-foreground">
            <FontAwesomeIcon icon="fas fa-star" />
            {ratings} / 5
          </p>
        </div>
      </Card>
    </div>
  );
}

export default RecipeCard;

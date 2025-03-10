import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/common";

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
      <Link href={`/product/${id}`} className="block relative">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          className="rounded-t-lg w-full aspect-video object-cover"
          priority
        />
      </Link>

      <div className="p-4 flex flex-col gap-3">
        <Link href={`/product/${id}`}>
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

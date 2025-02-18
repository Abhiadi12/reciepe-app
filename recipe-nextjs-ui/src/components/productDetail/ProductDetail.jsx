"use client";
import React from "react";
import { useParams } from "next/navigation";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import ProductCard from "./ProductCard";
import CommentBody from "@/components/comment/CommentBody";
import { Card } from "@/components/common";
import RatingBody from "@/components/rating/RatingBody";

function ProductDetail() {
  const { id } = useParams();
  const { product } = useGetProductDetail(id);

  if (!product) {
    return null;
  }

  return (
    <div className="mt-16">
      {/* Row 1 - Two Equal Halves on md and above */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ProductCard recipe={product} />

        <div className="flex flex-col p-4 ">
          <RatingBody recipeId={id} recipeOwnerId={product?.createdBy?._id} />
        </div>
      </div>

      {/* Row 2 - Full Width */}
      <Card className=" p-4 col-span-1 md:col-span-2">
        <CommentBody id={id} />
      </Card>
    </div>
  );
}

export default ProductDetail;

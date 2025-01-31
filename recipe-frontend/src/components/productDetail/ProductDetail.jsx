import React from "react";
import { useParams } from "react-router-dom";
import useGetProductDetail from "../../hooks/useGetProductDetail";
import ProductCard from "./ProductCard";
import CommentBody from "../comment/CommentBody";
import { Card } from "../common";

function ProductDetail() {
  // get id from url using router-dom
  const { id } = useParams();
  const { product } = useGetProductDetail(id);
  

  return (
    <div className="mt-16">
      {/* Row 1 - Two Equal Halves on md and above */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ProductCard recipe={product} />

        <div className="bg-blue-300 p-4">row-1 col-2</div>
      </div>

      {/* Row 2 - Full Width */}
      <Card className=" p-4 col-span-1 md:col-span-2">
        <CommentBody id={id} />
      </Card>
    </div>
  );
}

export default ProductDetail;

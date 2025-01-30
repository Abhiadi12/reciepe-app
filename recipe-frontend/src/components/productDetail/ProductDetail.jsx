import React from "react";
import { useParams } from "react-router-dom";
import useGetProductDetail from "../../hooks/useGetProductDetail";
import ProductCard from "./ProductCard";

function ProductDetail() {
  // get id from url using router-dom
  const { id } = useParams();
  const { product } = useGetProductDetail(id);

  return (
    <div className="mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1 - Two Equal Halves on md and above */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2">
            <ProductCard recipe={product} />
          </div>
          <div className="bg-blue-300 p-4">row-1 col-2</div>
        </div>

        {/* Row 2 - Full Width */}
        <div className="bg-blue-400 p-4 col-span-1 md:col-span-2">row 2</div>
      </div>
    </div>
  );
}

export default ProductDetail;

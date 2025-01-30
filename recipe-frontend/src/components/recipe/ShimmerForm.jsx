import React from "react";

const ShimmerForm = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-12 bg-gray-300 rounded mb-4"></div>
      <div className="h-24 bg-gray-300 rounded mb-4"></div>
      <div className="h-12 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-12 bg-gray-300 rounded mb-4"></div>
      <div className="h-40 bg-gray-300 rounded mb-4"></div>
      <div className="h-12 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default ShimmerForm;

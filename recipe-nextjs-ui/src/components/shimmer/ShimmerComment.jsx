import React from "react";

const ShimmerComment = () => {
  return (
    <div className="flex gap-3 p-4 border-b border-gray-200 animate-pulse">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ShimmerComment;

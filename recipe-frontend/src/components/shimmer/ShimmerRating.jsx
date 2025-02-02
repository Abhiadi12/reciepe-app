import React from "react";
import { Card } from "../common";

const ShimmerRating = () => {
  return (
    <Card className="w-full animate-pulse p-6">
      <div className="h-5 w-32 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded-md mb-4"></div>
      <div className="h-5 w-32 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-20 w-full bg-gray-300 rounded-md mb-4"></div>
      <div className="h-10 w-full bg-gray-300 rounded-md"></div>
    </Card>
  );
};

export default ShimmerRating;

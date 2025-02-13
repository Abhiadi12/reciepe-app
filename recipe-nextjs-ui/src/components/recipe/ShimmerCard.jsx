const ShimmerCard = () => {
  return (
    <div className="w-full h-300 p-4 bg-gray-200 rounded-2xl shadow-md animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg"></div>

      <div className="mt-4 space-y-2">
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        <div className="w-full h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;

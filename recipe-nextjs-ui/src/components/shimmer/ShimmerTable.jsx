const ShimmerTable = () => {
  return (
    <div className="w-full p-4">
      <div className="w-full overflow-hidden rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <th key={index} className="p-4">
                    <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill("")
              .map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {Array(4)
                    .fill("")
                    .map((_, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerTable;

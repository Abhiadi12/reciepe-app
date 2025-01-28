function Table({ columns, data, title, showActions = true }) {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 text-left bg-gray-100 border-b border-gray-300 text-sm font-semibold text-gray-700"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
          {/* show action */}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

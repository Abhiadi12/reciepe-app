import React from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTableFields } from "../../utils/getTableFields";

function Table({
  columns,
  data,
  title,
  handleChangeSelectedData,
  showActions = true,
}) {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-2 px-4 text-center bg-gray-100 border-b border-gray-300 text-sm font-semibold text-gray-700"
              >
                {column.title}
              </th>
            ))}
            {showActions && (
              <th className="py-2 px-4 text-center bg-gray-100 border-b border-gray-300 text-sm font-semibold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-2 px-4 border-b border-gray-300 text-center text-sm text-gray-600"
                >
                  {getTableFields(row[column.key])}
                </td>
              ))}
              {showActions && (
                <td className="py-2 px-4 border-b border-gray-300 text-center text-sm text-gray-600">
                  <div className="flex justify-around">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Edit"
                      onClick={() => handleChangeSelectedData(row._id, "edit")}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete"
                      onClick={() =>
                        handleChangeSelectedData(row._id, "delete")
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

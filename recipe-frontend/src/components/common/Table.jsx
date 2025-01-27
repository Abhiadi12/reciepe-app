import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Table({
  caption,
  headers,
  rows,
  footer,
  className,
  rowsPerPage = 5, // Default number of rows per page
  ...props
}) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Calculate the rows to display based on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  // Function to change the page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`relative w-full overflow-auto ${className}`} {...props}>
      <table className="w-full caption-bottom text-sm">
        {caption && (
          <caption className="mt-4 text-sm text-muted-foreground">
            {caption}
          </caption>
        )}
        {headers && (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b transition-colors hover:bg-muted/50"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot className="border-t bg-muted/50 font-medium">
            <tr>
              {footer.map((cell, index) => (
                <td key={index} className="p-4 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>

      {/* Pagination Controls with ShadCN style */}
      <div className="flex items-center justify-around mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground bg-muted/50 rounded-md hover:bg-muted/60 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="mr-4" /> Previous
        </button>

        <div className="flex items-center space-x-2">
          <span>Page</span>
          <span className="font-medium text-muted-foreground">
            {currentPage}
          </span>
          <span>of</span>
          <span className="font-medium text-muted-foreground">
            {totalPages}
          </span>
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground bg-muted/50 rounded-md hover:bg-muted/60 disabled:opacity-50"
        >
          Next <FontAwesomeIcon icon={faAngleRight} className="ml-4" />
        </button>
      </div>
    </div>
  );
}

export default Table;

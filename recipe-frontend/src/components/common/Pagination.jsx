import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({ currentPage, totalPages, onPageChange, isDisabled }) {
  return (
    <div className="flex items-center justify-around mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 rounded-md hover:bg-muted/60 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
        Previous
      </button>

      <div className="flex items-center space-x-2">
        <span>Page</span>
        <span className="font-medium text-muted-foreground">{currentPage}</span>
        <span>of</span>
        <span className="font-medium text-muted-foreground">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isDisabled}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 rounded-md hover:bg-muted/60 disabled:opacity-50"
      >
        Next
        <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
      </button>
    </div>
  );
}

export default Pagination;

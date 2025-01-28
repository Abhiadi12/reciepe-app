import React from "react";

function usePagination(pageNo = 1, pageSize = 10, total = 1) {
  const [page, setPage] = React.useState(pageNo);
  const [pageSize, setPageSize] = React.useState(pageSize);
  const [totalPages, setTotalPages] = React.useState(total);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleTotalPagesChange = (total) => {
    setTotalPages(total);
  };

  const isDisabled = (page) => {
    return page < 1 || page > totalPages;
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    setTotalPages,
    handlePageChange,
    handlePageSizeChange,
    handleTotalPagesChange,
    isDisabled,
  };
}

export default usePagination;

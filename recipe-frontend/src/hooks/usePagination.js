import React from "react";

function usePagination(pageNo = 1, pagelimit = 10, total = 1) {
  const [page, setPage] = React.useState(pageNo);
  const [pageSize, setPageSize] = React.useState(pagelimit);
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
    const totalGroups = Math.ceil(totalPages / pageSize);
    return page < 1 || page >= totalGroups;
  };

  return {
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    handleTotalPagesChange,
    isDisabled,
  };
}

export default usePagination;

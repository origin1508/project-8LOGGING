import { useState } from "react";

// http://localhost:3002/api/channels?page=1&status=0
// status == 0 : 모집 중인 채널
// status == 1 : 모집 완료된 채널
// status == 2 : 활동 종료된 채널

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const usePagination = (initialState: PaginationProps) => {
  const handleNextButtonClick = () => {
    initialState.setPage((prev) =>
      prev + 1 > initialState.totalPages ? initialState.totalPages : prev + 1
    );
  };

  const handlePrevButtonClick = () => {
    initialState.setPage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const handlePageButtonClick = (page: number) => () => {
    initialState.setPage(page);
  };

  return {
    handleNextButtonClick,
    handlePrevButtonClick,
    handlePageButtonClick,
  };
};

export default usePagination;

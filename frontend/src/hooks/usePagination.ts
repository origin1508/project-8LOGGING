import { useState } from "react";

// http://localhost:3002/api/channels?page=1&status=0
// status == 0 : 모집 중인 채널
// status == 1 : 모집 완료된 채널
// status == 2 : 활동 종료된 채널

interface PaginationProps {
  page: number;
  status: number;
  totalPages: number;
}

const usePagination = (initialState: PaginationProps) => {
  const [page, setPage] = useState<number>(initialState.page);
  const [status] = useState<number>(initialState.status);

  const handleNextButtonClick = () => {
    setPage((prev) =>
      prev + 1 > initialState.totalPages ? initialState.totalPages : prev + 1
    );
  };

  const handlePrevButtonClick = () => {
    setPage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const handlePageButtonClick = (page: number) => () => {
    setPage(page);
  };

  return {
    page,
    status,
    handleNextButtonClick,
    handlePrevButtonClick,
    handlePageButtonClick,
  };
};

export default usePagination;

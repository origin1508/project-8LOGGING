import React, { useMemo } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

interface PaginateButtonProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginateButton = ({ page, totalPages, setPage }: PaginateButtonProps) => {
  const handleNextButtonClick = () => {
    setPage((prev) => (prev + 1 > totalPages ? totalPages : prev + 1));
  };

  const handlePrevButtonClick = () => {
    setPage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const handlePageButtonClick = (page: number) => () => {
    setPage(page);
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }).map((p, i) => i + 1),
    [totalPages]
  );

  return (
    <PaginateContainer>
      <PaginateNav>
        <PaginateButtonStyle
          disabled={page === 1}
          onClick={handlePrevButtonClick}
        >
          &lt;
        </PaginateButtonStyle>
        {pages.map((p) => (
          <PaginateButtonStyle key={p} onClick={handlePageButtonClick(p)}>
            {p}
          </PaginateButtonStyle>
        ))}
        <PaginateButtonStyle onClick={handleNextButtonClick}>
          &gt;
        </PaginateButtonStyle>
      </PaginateNav>
    </PaginateContainer>
  );
};

const PaginateContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
  justify-content: center;
`;

const PaginateNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const PaginateButtonStyle = styled.button`
  background: ${GlobalTheme.colors.theme};
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: ${GlobalTheme.colors.white};
  font-size: 1rem;
  &:hover {
    background: ${GlobalTheme.colors.white};
    color: ${GlobalTheme.colors.theme};
    font-weight: bold;
    border: 1px solid ${GlobalTheme.colors.theme};
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default PaginateButton;

import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const CustomErrorComponent = () => {
  return (
    <ErrorContainer>
      나중에 스타일 추가
      <a href="/">Go back</a>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  background-color: ${GlobalTheme.colors.white};
`;

export default CustomErrorComponent;

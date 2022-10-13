import React, { useEffect } from "react";
import styled from "styled-components";
import { FallbackProps } from "react-error-boundary";
import GlobalTheme from "@/styles/theme";

const IS_DEV_MODE = true;

const CustomErrorComponent = ({ error }: FallbackProps) => {
  useEffect(() => {
    IS_DEV_MODE && console.log(error);
  }, []);

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

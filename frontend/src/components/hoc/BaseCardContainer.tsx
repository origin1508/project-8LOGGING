import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseCardContainer = ({ children }: BaseComponentType) => {
  return <BaseCardContainerStyle>{children}</BaseCardContainerStyle>;
};

const BaseCardContainerStyle = styled.div`
  width: 40rem;
  overflow: hidden;
  height: 65rem;
  border-radius: 1rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default BaseCardContainer;
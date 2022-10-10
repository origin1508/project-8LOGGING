import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

export const BigTitle = styled.h1`
  margin-left: 2rem;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
`;

export const TitleContainer = styled.div`
  padding: 2rem;
  height: 20%;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;

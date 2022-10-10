import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
interface ButtonProps {
  width?: string;
}

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

export const EditButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
export const EditButton = styled.button<ButtonProps>`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.width};
  font-size: 1.5rem;
  padding: 1rem 2rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

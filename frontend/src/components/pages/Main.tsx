import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

interface ButtonProps {
  bgColor?: string;
  color?: string;
}

function Main() {
  return (
    <MainContainer>
      <MainContent>
        <MainContentTitle>
          Join plogging for a Pleasant environment For Everyone
        </MainContentTitle>
        <MainContentMinTitle>
          We are help for health in the world. We make world a better place
        </MainContentMinTitle>
        <ButtonContainer>
          <Button
            color={GlobalTheme.colors.white}
            bgColor={GlobalTheme.colors.theme}
          >
            Explore our service
          </Button>
          <Button
            color={GlobalTheme.colors.theme}
            bgColor={GlobalTheme.colors.white}
          >
            Explore our service
          </Button>
        </ButtonContainer>
        <ImgContainer>
          <MainImg src="mainPloggingImg2.png" />
          <MainImg src="mainPloggingImg.png" />
        </ImgContainer>
      </MainContent>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20%;
`;

const MainContent = styled.div`
  margin: 4rem 0 0 20rem;
`;

const MainContentTitle = styled.h1`
  font-family: ${GlobalTheme.fontStyle.bold};
  font-size: 4.5rem;
  width: 55rem;
`;

const MainContentMinTitle = styled.h3`
  font-size: ${GlobalTheme.fontSize.littleBig};
  margin-bottom: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
`;

const Button = styled.button<ButtonProps>`
  ${GlobalTheme.buttons}
  background-color:${(props) => props.bgColor};
  color: ${(props) => props.color};
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

const ImgContainer = styled.div`
  display: flex;
  gap: 8%;
`;

const MainImg = styled.img`
  width: 40%;
`;

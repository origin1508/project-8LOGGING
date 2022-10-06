import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

interface ImgProps {
  img?: string;
}
function UserCard() {
  return (
    <UserCardContainer>
      <TitleContainer>
        <Title>MY PROFILE</Title>
      </TitleContainer>
      <Img img="mainPloggingImg2.png"></Img>
      <InforContainer>
        <UserName>김대운 (dlzagu)</UserName>
        <UserEmail>eodnsdlekd@naver.com</UserEmail>
        <UserDescription>안녕하세요 ~ ~</UserDescription>
        <Button>Edit</Button>
      </InforContainer>
    </UserCardContainer>
  );
}

const UserCardContainer = styled.div`
  margin-top: 5rem;
  width: 40rem;
  height: 60rem;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  padding: 2rem;
  height: 20%;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  margin-left: 2rem;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
`;

const Img = styled.div<ImgProps>`
  width: 7rem;
  height: 7rem;
  background-image: url(${(props) => props.img});
  background-size: cover;
  border-radius: 100%;
  margin-bottom: 2rem;
`;
const InforContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

const UserName = styled.h3``;

const UserEmail = styled.span``;

const UserDescription = styled.span``;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: 80%;
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
export default UserCard;

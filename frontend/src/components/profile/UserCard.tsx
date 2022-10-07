import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";

interface ImgProps {
  img?: string;
}
interface UserCardProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserCard({ setIsEditing }: UserCardProps) {
  const curUser = useRecoilValue(curUserState);

  const handlerEditClick = () => {
    setIsEditing(true);
  };
  return (
    <UserCardContainer>
      <TitleContainer>
        <Title>MY PROFILE</Title>
      </TitleContainer>
      <Img img="mainPloggingImg2.png"></Img>
      <InforContainer>
        <UserNicname>${curUser?.nickname}</UserNicname>
        <UserEmail>${curUser?.email}</UserEmail>
        <UserDescription>${curUser?.description}</UserDescription>
        <Button onClick={handlerEditClick}>Edit</Button>
      </InforContainer>
    </UserCardContainer>
  );
}

const UserCardContainer = styled.div`
  width: 40rem;
  overflow: hidden;
  height: 65rem;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  background-color: ${GlobalTheme.colors.lightThreeGray};
  border-radius: 1rem;
  width: 80%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 1rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

const UserNicname = styled.h3``;

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

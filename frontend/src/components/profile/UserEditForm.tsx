import React from "react";
import styled, { css } from "styled-components";
import GlobalTheme from "@/styles/theme";

interface ImgProps {
  img?: string;
}
interface ButtonProps {
  width?: string;
}
interface UserCardEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditInput = css`
  background-color: ${GlobalTheme.colors.lightGray};
  width: 60%;
  border: 1px solid ${GlobalTheme.colors.theme};
  padding: 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${GlobalTheme.colors.lightTwoGray};
  }
`;

function UserCardEditForm({ setIsEditing }: UserCardEditProps) {
  const handlerClick = () => {
    setIsEditing(false);
  };
  return (
    <EditContainer>
      <TitleContainer>
        <Title>EDIT USER INFORMATION</Title>
      </TitleContainer>
      <Img img="mainPloggingImg2.png"></Img>
      <InforContainer>
        <UserNameInput
          type="text"
          placeholder="Name..."
          value="김대운"
          name="name"
        />
        <UserNickNameIntput
          type="text"
          placeholder="NickName..."
          value="dlzagu"
          name="nickname"
        />
        <UserEmailIntput
          type="text"
          placeholder="Email..."
          value="eodnsdlekd@naver.com"
          name="email"
        />
        <UserDescriptionInput
          type="text"
          placeholder="Description..."
          value="안녕하세요 ~~~"
          name="description"
        />
        <ButtonWrapper>
          <Button width="60%" onClick={handlerClick}>
            CONFIRM
          </Button>
          <Button width="60%" onClick={handlerClick}>
            CANCEL
          </Button>
        </ButtonWrapper>
        <Button width="60%">비밀번호 변경하기</Button>
      </InforContainer>
    </EditContainer>
  );
}

const EditContainer = styled.div`
  width: 40rem;
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
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  font-size: ${GlobalTheme.fontSize.littleBig};
  input {
    ${EditInput}
  }
`;

const UserNameInput = styled.input``;

const UserNickNameIntput = styled.input``;

const UserEmailIntput = styled.input``;

const UserDescriptionInput = styled.input``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const Button = styled.button<ButtonProps>`
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
export default UserCardEditForm;

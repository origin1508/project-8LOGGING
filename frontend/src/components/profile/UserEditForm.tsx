import React from "react";
import styled, { css } from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilState } from "recoil";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import UseEditForm from "@/hooks/useEditForm";
import * as Api from "@/api/api";
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
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const handlerClick = () => {
    setIsEditing(false);
  };
  const [values, handleEditFormChange, isValid] = UseEditForm({
    nickname: curUser.nickname,
    description: curUser.description,
  });

  const isValidAll = isValid.description && isValid.nickname;

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();
    try {
      const res = await Api.put(`/api/users/description`, {
        description: values.description,
      });
      const res2 = await Api.put(`/api/users/nickname`, {
        nickname: values.nickname,
      });
      const newDescription = res.data.datas.description;
      const newNickname = res2.data.datas.nickname;
      setCurUser({
        ...curUser,
        description: newDescription,
        nickname: newNickname,
      });
      setIsEditing(false);
      console.log(res.data.success);
      console.log(newNickname);
      console.log(curUser);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <EditContainer>
      <TitleContainer>
        <Title>EDIT USER INFORMATION</Title>
      </TitleContainer>
      <Img img={curUser?.profPic}></Img>
      <InpurForm onSubmit={handleSubmitClick}>
        <InputContainer>
          <UserNickNameIntput
            type="text"
            placeholder="NickName..."
            value={values.nickname}
            name="nickname"
            onChange={handleEditFormChange}
          />
          {values.nickname && !isValid.nickname && (
            <BaseValidateTextContainer>
              please check your nickname
            </BaseValidateTextContainer>
          )}
        </InputContainer>
        <InputContainer>
          <UserDescriptionInput
            type="text"
            placeholder="Description..."
            value={values.description}
            name="description"
            onChange={handleEditFormChange}
          />
          {values.description && !isValid.description && (
            <BaseValidateTextContainer>
              please check your introduction
            </BaseValidateTextContainer>
          )}
        </InputContainer>

        <ButtonWrapper>
          <Button width="60%" type="submit" disabled={!isValidAll}>
            CONFIRM
          </Button>
          <Button width="60%" onClick={handlerClick}>
            CANCEL
          </Button>
        </ButtonWrapper>
        <Button width="60%">비밀번호 변경하기</Button>
      </InpurForm>
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
const InpurForm = styled.form`
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
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
const UserNickNameIntput = styled.input``;

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

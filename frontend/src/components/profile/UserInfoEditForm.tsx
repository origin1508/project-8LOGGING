import React, { useState } from "react";
import styled, { css } from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilState } from "recoil";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import UseEditForm from "@/hooks/useEditForm";
import * as Api from "@/api/api";
import BaseCardContainer from "../hoc/BaseCardContainer";

import { BigTitle, TitleContainer } from "@/styles/commonStyle";

interface ImgProps {
  img?: string;
}
interface ButtonProps {
  width?: string;
}
interface UserInfoEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onModalOpenButtonClickEvent: () => void;
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

function UserInfoEditForm({
  setIsEditing,
  setIsPsEditing,
  onModalOpenButtonClickEvent,
}: UserInfoEditProps) {
  const [curUser, setCurUser] = useRecoilState(curUserState);

  const handlerClick = () => {
    setIsEditing(false);
  };
  const [values, handleEditFormChange, isValid] = UseEditForm({
    nickname: curUser.nickname,
    description: curUser.description,
  });

  const isValidAll = isValid.description && isValid.nickname;

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await Api.put(`/api/users/nickname`, {
        newNickname: values.nickname,
      });
      const res2 = await Api.put(`/api/users/description`, {
        newDescription: values.description,
      });

      const newNickname = res.data.datas.nickname;
      const newDescription = res2.data.datas.description;

      setCurUser({
        ...curUser,
        nickname: newNickname,
        description: newDescription,
      });

      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BaseCardContainer>
      <TitleContainer>
        <BigTitle>EDIT USER INFORMATION</BigTitle>
      </TitleContainer>
      <Img img={curUser?.profPic} onClick={onModalOpenButtonClickEvent}></Img>
      <InpurForm onSubmit={handleSubmitClick}>
        <InputContainer>
          닉네임변경
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
          한줄소개 변경
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
        <Button width="60%" onClick={() => setIsPsEditing(true)}>
          비밀번호 변경하기
        </Button>
      </InpurForm>
    </BaseCardContainer>
  );
}

const Img = styled.div<ImgProps>`
  width: 7rem;
  height: 7rem;
  cursor: pointer;
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
export default UserInfoEditForm;

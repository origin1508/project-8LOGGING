import React, { useState } from "react";
import styled, { css } from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilState } from "recoil";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import useEditForm from "@/hooks/useEditForm";
import BaseCardContainer from "../hoc/BaseCardContainer";
import Modal from "../modal/Modal";
import { ErrorType } from "@/types/error/errorType";
import {
  authProfileNickUpdate,
  authProfileDescriptionUpdate,
} from "@/api/authFetcher";

import {
  BigTitle,
  TitleContainer,
  EditButtonWrapper,
  EditButton,
} from "@/styles/commonStyle";

interface ImgProps {
  img?: string;
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
  const [erorrMessage, setErorrMessage] = useState("");
  const [isOppenModal, setIsOpenModal] = useState(false);

  const handlerClick = () => {
    setIsEditing(false);
  };
  const [values, handleEditFormChange, isValid] = useEditForm({
    nickname: curUser.nickname,
    description: curUser.description,
  });

  const isValidAll = isValid.description && isValid.nickname;
  const onModalCancelButtonClickEvent = () => {
    setIsOpenModal(false);
  };

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { nickname } = await authProfileNickUpdate(
        "/api/users/nickname",
        values.nickname
      );
      const { description } = await authProfileDescriptionUpdate(
        "/api/users/description",
        values.description
      );
      setCurUser({
        ...curUser,
        nickname: nickname,
        description: description,
      });

      setIsEditing(false);
    } catch (e) {
      const err = e as ErrorType;
      const erorrMessage = err.response.data.message;
      setErorrMessage(erorrMessage);
      setIsOpenModal(true);
    }
  };

  return (
    <BaseCardContainer width="50vh">
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
        <EditButtonWrapper>
          <EditButton width="60%" type="submit" disabled={!isValidAll}>
            CONFIRM
          </EditButton>
          <EditButton width="60%" type="button" onClick={handlerClick}>
            CANCEL
          </EditButton>
        </EditButtonWrapper>
        <EditButton
          width="60%"
          type="button"
          onClick={() => setIsPsEditing(true)}
        >
          비밀번호 변경하기
        </EditButton>
      </InpurForm>
      <Modal
        isOpenModal={isOppenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={onModalCancelButtonClickEvent}
      >
        {erorrMessage}
      </Modal>
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

export default UserInfoEditForm;

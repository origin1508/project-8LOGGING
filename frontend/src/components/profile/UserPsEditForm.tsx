import React, { useState } from "react";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import { useNavigate } from "react-router-dom";
import GlobalTheme from "@/styles/theme";
import styled, { css } from "styled-components";
import usePsEditForm from "@/hooks/usePsEditForm";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import {
  BigTitle,
  TitleContainer,
  EditButtonWrapper,
  EditButton,
} from "@/styles/commonStyle";
import Storage from "@/storage/storage";
import Modal from "../modal/Modal";
import { authProfilePasswordUpdate } from "@/api/authFetcher";
import ValidationUtil from "@/util/validationUtil";
import { ErrorType } from "@/types/error/errorType";

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

interface UserInfoEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserPsEditForm({ setIsEditing, setIsPsEditing }: UserInfoEditProps) {
  const navigate = useNavigate();
  const [erorrMessage, setErorrMessage] = useState("");
  const [isOppenModal, setIsOpenModal] = useState(false);
  const [values, handleEditFormChange] = usePsEditForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const isValidCurPassword = ValidationUtil.checkPasswordValidate(
    values.currentPassword
  );
  const isValidNewPassword = ValidationUtil.checkPasswordValidate(
    values.newPassword
  );

  const isPasswordSame = values.newPassword === values.confirmPassword;
  const isValid = [
    isValidCurPassword,
    isValidNewPassword,
    isPasswordSame,
  ].every((v) => v === true);

  const onModalCancelButtonClickEvent = () => {
    setIsOpenModal(false);
  };
  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authProfilePasswordUpdate(
        "/api/users/password",
        values.currentPassword,
        values.newPassword
      );
      Storage.clearToken();
      setIsEditing(false);
      navigate("/auth", { replace: true });
    } catch (e) {
      const error = e as ErrorType;
      const erorrMessage = error.response.data.message;
      setErorrMessage(erorrMessage);
      setIsOpenModal(true);
    }
  };
  return (
    <BaseCardContainer width="40rem">
      <TitleContainer>
        <BigTitle>비밀번호 변경</BigTitle>
      </TitleContainer>
      <InpurForm onSubmit={handleSubmitClick}>
        <InputContainer>
          현재 비밀번호
          <UserNickNameIntput
            type="password"
            placeholder="Password..."
            value={values.currentPassword}
            name="currentPassword"
            onChange={handleEditFormChange}
          />
        </InputContainer>
        <InputContainer>
          새로운 비밀번호
          <UserNickNameIntput
            type="password"
            placeholder="New password..."
            value={values.newPassword}
            name="newPassword"
            onChange={handleEditFormChange}
          />
          {values.newPassword && !isValidNewPassword && (
            <BaseValidateTextContainer>
              8~15자 영문 소문자, 숫자, 특수문자를 사용해주세요.
            </BaseValidateTextContainer>
          )}
        </InputContainer>

        <InputContainer>
          새로운 비밀번호 확인
          <UserDescriptionInput
            type="password"
            placeholder="Check new password..."
            value={values.confirmPassword}
            name="confirmPassword"
            onChange={handleEditFormChange}
          />
          {!isPasswordSame ? (
            <BaseValidateTextContainer>
              비밀번호가 일치하지 않습니다.
            </BaseValidateTextContainer>
          ) : (
            ""
          )}
        </InputContainer>

        <EditButtonWrapper>
          <EditButton width="60%" type="submit" disabled={!isValid}>
            CONFIRM
          </EditButton>
          <EditButton width="60%" onClick={() => setIsPsEditing(false)}>
            CANCEL
          </EditButton>
        </EditButtonWrapper>
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

export default UserPsEditForm;

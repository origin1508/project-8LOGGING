import React from "react";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import styled, { css } from "styled-components";
import { useRecoilState } from "recoil";
import usePsEditForm from "@/hooks/usePsEditForm";
import * as Api from "@/api/api";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import {
  BigTitle,
  TitleContainer,
  EditButtonWrapper,
  EditButton,
} from "@/styles/commonStyle";

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
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [values, handleEditFormChange, isValid] = usePsEditForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await Api.put(`/api/users/password`, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      const newPassword = res.data.dats;

      setCurUser({
        ...curUser,
        password: newPassword,
      });

      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BaseCardContainer>
      <TitleContainer>
        <BigTitle>Change Password</BigTitle>
      </TitleContainer>
      <InpurForm>
        <InputContainer>
          Password
          <UserNickNameIntput
            type="password"
            placeholder="Password..."
            value={values.currentPassword}
            name="currentPassword"
            onChange={handleEditFormChange}
          />
        </InputContainer>
        <InputContainer>
          New password
          <UserNickNameIntput
            type="password"
            placeholder="New password..."
            value={values.newPassword}
            name="newPassword"
            onChange={handleEditFormChange}
          />
          {values.newPassword && !isValid.newPassword && (
            <BaseValidateTextContainer>
              please check new password
            </BaseValidateTextContainer>
          )}
        </InputContainer>

        <InputContainer>
          Check new password
          <UserDescriptionInput
            type="password"
            placeholder="Check new password..."
            value={values.confirmPassword}
            name="confirmPassword"
            onChange={handleEditFormChange}
          />
          {values.newPassword !== values.confirmPassword ? (
            <BaseValidateTextContainer>
              비밀번호가 일치하지 않습니다.
            </BaseValidateTextContainer>
          ) : (
            ""
          )}
        </InputContainer>

        <EditButtonWrapper>
          <EditButton width="60%" type="submit">
            CONFIRM
          </EditButton>
          <EditButton width="60%" onClick={() => setIsPsEditing(false)}>
            CANCEL
          </EditButton>
        </EditButtonWrapper>
      </InpurForm>
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

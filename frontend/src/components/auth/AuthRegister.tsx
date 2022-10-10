import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { AuthFormInitialType } from "@/types/auth/authTypes";
import ValidationUtil from "@/util/validationUtil";

interface Props {
  authFormState: AuthFormInitialType;
  onRegisterFormValueChaneEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRegisterSubmitEvent: (e: React.FormEvent) => void;
}

const AuthReigster: React.FC<Props> = ({
  authFormState,
  onRegisterFormValueChaneEvent,
  onRegisterSubmitEvent,
}) => {
  const isValidEmail = ValidationUtil.checkEmailValidate(authFormState.email);
  const isValidNickname = ValidationUtil.checkNicknameValidate(
    authFormState.nickname || ""
  );
  const isValidPassword = ValidationUtil.checkPasswordValidate(
    authFormState.password
  );
  const isPasswordSame =
    authFormState.password === authFormState.confirmPassword;
  const isValid = [
    isValidEmail,
    isValidNickname,
    isValidPassword,
    isPasswordSame,
  ].every((v) => v === true);

  return (
    <RegistrationFormContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Email"
          name="email"
          value={authFormState.email}
          onChange={onRegisterFormValueChaneEvent}
        />
        {!isValidEmail && (
          <BaseValidateTextContainer>
            Please check your email
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Nickname"
          name="nickname"
          value={authFormState.nickname}
          onChange={onRegisterFormValueChaneEvent}
        />
        {!isValidNickname && (
          <BaseValidateTextContainer>
            Please check your nickname
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Password"
          type="password"
          name="password"
          value={authFormState.password}
          onChange={onRegisterFormValueChaneEvent}
        />
        {!isValidPassword && (
          <BaseValidateTextContainer>
            Special characters and numbers from 8 to 15.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          value={authFormState.confirmPassword}
          onChange={onRegisterFormValueChaneEvent}
        />
        {!isPasswordSame && (
          <BaseValidateTextContainer>
            Please check your password and confirm password
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <RegistrationButtonContainer>
        <RegistrationButton
          disabled={isValid ? false : true}
          type="submit"
          onClick={onRegisterSubmitEvent}
        >
          Register
        </RegistrationButton>
      </RegistrationButtonContainer>
    </RegistrationFormContainer>
  );
};

const RegistrationFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 5rem;
`;

const RegistrationInput = styled.input`
  width: 100%;
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  border-radius: ${GlobalTheme.input.borderRadius};
  padding: ${GlobalTheme.input.padding};
  box-sizing: border-box;
  line-height: 3rem;
  border: ${GlobalTheme.input.border};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
`;

const RegistrationButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegistrationButton = styled.button`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export default AuthReigster;

import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { AuthFormInitialType } from "@/types/auth/authTypes";

interface Props {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  authFormState: AuthFormInitialType;
  onRegisterFormValueChaneEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRegisterSubmitEvent: (e: React.FormEvent) => void;
}

interface RegistrationButtonProps {
  bgColor?: string;
  Color?: string;
}

const AuthReigster: React.FC<Props> = ({
  setTabIndex,
  authFormState,
  onRegisterFormValueChaneEvent,
  onRegisterSubmitEvent,
}) => {
  return (
    <RegistrationFormContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Email"
          name="email"
          value={authFormState.email}
          onChange={onRegisterFormValueChaneEvent}
        />
        <BaseValidateTextContainer>
          ㅁㅇㄻㄴㄹㄴㅁㅇㄹ
        </BaseValidateTextContainer>
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Nickname"
          name="nickname"
          value={authFormState.nickname}
          onChange={onRegisterFormValueChaneEvent}
        />
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Password"
          type="password"
          name="password"
          value={authFormState.password}
          onChange={onRegisterFormValueChaneEvent}
        />
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          value={authFormState.confirmPassword}
          onChange={onRegisterFormValueChaneEvent}
        />
      </BaseIntputContainer>
      <RegistrationButtonContainer>
        <RegistrationButton type="submit" onClick={onRegisterSubmitEvent}>
          Register
        </RegistrationButton>
        <RegistrationButton
          bgColor={GlobalTheme.colors.white}
          color={GlobalTheme.colors.theme}
          onClick={() => setTabIndex(0)}
        >
          sign in
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
const RegistrationButton = styled.button<RegistrationButtonProps>`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${(props) => props.color || GlobalTheme.colors.white};
  background-color: ${(props) => props.bgColor || GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export default AuthReigster;

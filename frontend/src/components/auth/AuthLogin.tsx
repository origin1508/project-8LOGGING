import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { AuthFormInitialType } from "@/types/auth/authTypes";
import { ValidationType } from "@/types/auth/validationTypes";

interface AuthLoginProps {
  loginValue: AuthFormInitialType;
  onLoginFormChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginSubmitEvent: (e: React.FormEvent) => void;
  isValid: ValidationType;
  errMessage: string;
}

const AuthLogin = ({
  loginValue,
  onLoginFormChangeEvent,
  onLoginSubmitEvent,
  isValid,
  errMessage,
}: AuthLoginProps) => {
  const isValidAll = isValid.email && isValid.password;
  return (
    <AuthLoginFormContainer onSubmit={onLoginSubmitEvent}>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="Email"
          type="email"
          name="email"
          onChange={onLoginFormChangeEvent}
          value={loginValue.email}
        />
        {loginValue.email && !isValid.email && (
          <BaseValidateTextContainer>
            please check your email
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="Password"
          type="password"
          name="password"
          onChange={onLoginFormChangeEvent}
          value={loginValue.password}
        />
        {loginValue.password && !isValid.password && (
          <BaseValidateTextContainer>
            please check your password
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <AuthLoginButtonContainer>
        <AuthLoginButton type="submit" disabled={!isValidAll && true}>
          Sign in
        </AuthLoginButton>
        <AuthErrorMessage>{errMessage}</AuthErrorMessage>
      </AuthLoginButtonContainer>
    </AuthLoginFormContainer>
  );
};

const AuthLoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 5rem;
`;

const AuthLoginInput = styled.input`
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
const AuthLoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AuthLoginButton = styled.button`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
`;

const AuthErrorMessage = styled.div`
  color: red;
  font-size: ${GlobalTheme.fontSize.default};
  margin-top: 3rem;
`;
export default AuthLogin;

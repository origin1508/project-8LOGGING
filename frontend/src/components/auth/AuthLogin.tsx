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
}

const AuthLogin = ({
  loginValue,
  onLoginFormChangeEvent,
  onLoginSubmitEvent,
  isValid,
}: AuthLoginProps) => {
  const isValidAll = isValid.email && isValid.password;
  return (
    <AuthLoginFormContainer onSubmit={onLoginSubmitEvent}>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="이메일"
          type="email"
          name="email"
          onChange={onLoginFormChangeEvent}
          value={loginValue.email}
        />
        {loginValue.email && !isValid.email && (
          <BaseValidateTextContainer>
            올바른 이메일을 입력해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="비밀번호"
          type="password"
          name="password"
          onChange={onLoginFormChangeEvent}
          value={loginValue.password}
        />
        {loginValue.password && !isValid.password && (
          <BaseValidateTextContainer>
            올바른 비밀번호를 입력해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <AuthLoginButtonContainer>
        <AuthLoginButton type="submit" disabled={!isValidAll && true}>
          로그인
        </AuthLoginButton>
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
  &:disabled {
    color: ${GlobalTheme.colors.lightGray};
    background-color: ${GlobalTheme.colors.gray};
  }
`;

export default AuthLogin;

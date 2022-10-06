import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";

const AuthLogin = () => {
  return (
    <AuthLoginFormContainer>
      <BaseIntputContainer>
        <AuthLoginInput placeholder="Please enter your email" />
      </BaseIntputContainer>
      <BaseIntputContainer>
        <AuthLoginInput placeholder="Please enter your password" />
      </BaseIntputContainer>
      <BaseIntputContainer>
        <AuthLoginButton>Sign in</AuthLoginButton>
      </BaseIntputContainer>
    </AuthLoginFormContainer>
  );
};

const AuthLoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 12rem;
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

const AuthLoginButton = styled.div`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
`;
export default AuthLogin;

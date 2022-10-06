import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const AuthLogin = () => {
  return (
    <AuthLoginFormContainer>
      <AuthLoginInputContainer>
        <AuthLoginInput placeholder="Email" />
      </AuthLoginInputContainer>
      <AuthLoginInputContainer>
        <AuthLoginInput placeholder="Password" />
      </AuthLoginInputContainer>
      <AuthLoginButtonContainer>
        <AuthLoginButton>Sign in</AuthLoginButton>
      </AuthLoginButtonContainer>
    </AuthLoginFormContainer>
  );
};

const AuthLoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 5rem;
`;

const AuthLoginInputContainer = styled.div`
  margin-bottom: 1rem;
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
  margin-bottom: 2rem;
`;

const AuthLoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

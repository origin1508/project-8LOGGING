import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const AuthLogin = () => {
  return (
    <AuthLoginFormContainer>
      <AuthLoginInputContainer>
        <AuthLoginInput placeholder="Please enter your email" />
      </AuthLoginInputContainer>
      <AuthLoginInputContainer>
        <AuthLoginInput placeholder="Please enter your password" />
      </AuthLoginInputContainer>
    </AuthLoginFormContainer>
  );
};

const AuthLoginFormContainer = styled.div`
  width: 500px;
  padding: 1rem;
`;

const AuthLoginInputContainer = styled.div`
  margin-bottom: 1rem;
`;

const AuthLoginInput = styled.input`
  width: ${GlobalTheme.input.width};
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  border-radius: ${GlobalTheme.input.borderRadius};
  padding: ${GlobalTheme.input.padding};
  border: ${GlobalTheme.input.border};
`;

export default AuthLogin;

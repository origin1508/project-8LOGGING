import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginForm from "@/hooks/useLoginForm";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [loginValue, handleChange] = useLoginForm({
    email: "",
    password: "",
  });

  const submitHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = JSON.stringify(loginValue);

    await axios
      .post("http://localhost:3003/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const token = res.data.datas.token;
        localStorage.setItem("token", token);
        navigate("/", { replace: true });
      });
  };

  return (
    <AuthLoginFormContainer onSubmit={submitHandle}>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={loginValue.email}
        />
      </BaseIntputContainer>
      <BaseIntputContainer>
        <AuthLoginInput
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={loginValue.password}
        />
      </BaseIntputContainer>
      <AuthLoginButtonContainer>
        <AuthLoginButton type="submit">Sign in</AuthLoginButton>
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
export default AuthLogin;

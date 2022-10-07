import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import useRegisterForm from "@/hooks/useRegisterForm";
import useLoginForm from "@/hooks/useLoginForm";
import AuthLogin from "@/components/auth/AuthLogin";
import AuthReigster from "../auth/AuthRegister";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { authRegisterRequest, authLoginRequest } from "@/api/authFetcher";
import { useRecoilState } from "recoil";
import { curUserIdState } from "@/recoil/atoms/authState";
const TapMenu = ["Sign in", "Registration"];

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { authFormState, handleAuthFormValueChange } = useRegisterForm({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [loginValue, handleLoginFormChange, isValid] = useLoginForm({
    email: "",
    password: "",
  });
  const [curUserId, setCurUserId] = useRecoilState(curUserIdState);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, nickname, password } = authFormState;
    const res = await authRegisterRequest("/api/auth/register", {
      email,
      nickname,
      password,
    });
    if (res) setTabIndex(0);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginValue;
    const res = await authLoginRequest("/api/auth/login", {
      email,
      password,
    });

    setCurUserId(res.userId);
    console.log(curUserId);
    if (res) navigate("/");
  };

  return (
    <BasePageComponent>
      <LoginContainer tabIndex={tabIndex}>
        <LoginHeader>
          <LoginHeaderTitle>8LOGGING</LoginHeaderTitle>
          <LoginTaps>
            {TapMenu.map((menu, index) => {
              return (
                <Tab
                  onClick={() => {
                    setTabIndex(index);
                  }}
                  key={index}
                  style={{
                    borderBottom:
                      tabIndex === index
                        ? `2px solid ${GlobalTheme.colors.theme}`
                        : "none",
                    color:
                      tabIndex === index
                        ? GlobalTheme.colors.black
                        : GlobalTheme.colors.gray,
                  }}
                >
                  {menu}
                </Tab>
              );
            })}
          </LoginTaps>
        </LoginHeader>
        <FormContainer>
          {tabIndex === 0 ? (
            <AuthLogin
              loginValue={loginValue}
              onLoginFormChangeEvent={handleLoginFormChange}
              onLoginSubmitEvent={handleLoginSubmit}
              isValid={isValid}
            />
          ) : (
            <AuthReigster
              setTabIndex={setTabIndex}
              authFormState={authFormState}
              onRegisterFormValueChaneEvent={handleAuthFormValueChange}
              onRegisterSubmitEvent={handleRegisterSubmit}
            />
          )}
        </FormContainer>
      </LoginContainer>
    </BasePageComponent>
  );
};

const LoginContainer = styled.div`
  position: absolute;
  top: 17%;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 8px;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 4px 5px ${GlobalTheme.colors.gray};
  width: 50rem;
  height: ${(props) => (props.tabIndex === 0 ? "45rem" : "65rem")};
`;
const LoginHeader = styled.div`
  width: 100%;
  height: 12rem;
  border-bottom: 1px solid ${GlobalTheme.colors.lightTwoGray};
`;
const LoginHeaderTitle = styled.div`
  margin: 2rem 0 2rem 3rem;
  font-size: ${GlobalTheme.fontSize.realBig};
  font-weight: bold;
`;
const LoginTaps = styled.div`
  display: flex;
  margin-left: 2rem;
  height: 3rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
const Tab = styled.div`
  margin-right: 3rem;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direcrtion: column;

  height: 100%;
  justify-content: center;
`;

export default Auth;

import React, { useState } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import AuthLogin from "@/components/auth/AuthLogin";
import AuthReigster from "../auth/AuthRegister";

const TapMenu = ["Sign in", "Registration"];

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <LoginWarrper>
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
            <AuthLogin />
          ) : (
            <AuthReigster setTabIndex={setTabIndex} />
          )}
        </FormContainer>
      </LoginContainer>
    </LoginWarrper>
  );
};

const LoginWarrper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
`;
const LoginContainer = styled.div`
  position: absolute;
  top: 17%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 26rem;
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

export default Login;

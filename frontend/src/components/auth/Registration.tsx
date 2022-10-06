import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const Registration = () => {
  return (
    <RegistrationFormContainer>
      <RegistrationInputContainer>
        <RegistrationInput placeholder="Email" />
      </RegistrationInputContainer>
      <RegistrationInputContainer>
        <RegistrationInput placeholder="Nickname" />
      </RegistrationInputContainer>
      <RegistrationInputContainer>
        <RegistrationInput placeholder="Password" />
      </RegistrationInputContainer>
      <RegistrationInputContainer>
        <RegistrationInput placeholder="Confirm password" />
      </RegistrationInputContainer>
      <RegistrationButtonContainer>
        <RegistrationButton>Register</RegistrationButton>
        <RegistrationButton
          bgColor={GlobalTheme.colors.white}
          color={GlobalTheme.colors.theme}
        >
          sign in
        </RegistrationButton>
      </RegistrationButtonContainer>
    </RegistrationFormContainer>
  );
};

const RegistrationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;

  margin-top: 5rem;
`;

const RegistrationInputContainer = styled.div`
  margin-bottom: 1rem;
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
  margin-bottom: 2rem;
`;

const RegistrationButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegistrationButton = styled.div<RegistrationButtonProps>`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
  ${(props) =>
    props &&
    `
      background-color: ${props.bgColor};
      color: ${props.color};
    `}
`;

interface RegistrationButtonProps {
  bgColor?: string;
  Color?: string;
}

export default Registration;

import React from "react";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import styled from "styled-components";
import { BigTitle, TitleContainer } from "@/styles/commonStyle";
import GlobalTheme from "@/styles/theme";

interface UserInfoEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ButtonProps {
  width?: string;
}
function UserPsEditForm({ setIsEditing, setIsPsEditing }: UserInfoEditProps) {
  return (
    <BaseCardContainer>
      <TitleContainer>
        <BigTitle>Change Password</BigTitle>
      </TitleContainer>
      <ButtonWrapper>
        <Button width="60%" type="submit">
          CONFIRM
        </Button>
        <Button width="60%">CANCEL</Button>
      </ButtonWrapper>
    </BaseCardContainer>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const Button = styled.button<ButtonProps>`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.width};
  font-size: 1.5rem;
  padding: 1rem 2rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

export default UserPsEditForm;

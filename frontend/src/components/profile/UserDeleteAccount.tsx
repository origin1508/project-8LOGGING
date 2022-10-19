import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseInputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";

interface Props {
  confirmCheck: string;
  setConfirmCheck: React.Dispatch<React.SetStateAction<string>>;
  confirmMessage: string;
}

const UserDeleteAccount = ({
  confirmCheck,
  setConfirmCheck,
  confirmMessage,
}: Props) => {
  return (
    <UserDeleteAccountContainer>
      <TitleContainer>Delete Account</TitleContainer>
      <BodyContainer>
        <TextAreaContainer>
          정말 회원탈퇴를 하시겠습니까? <br />
          탈퇴를 하게 되면 서비스 이용이 불가능하게 됩니다.
        </TextAreaContainer>
        <BaseInputContainer>
          <ConfirmInput
            placeholder="계속 진행하시려면 이메일을 입력하세요."
            value={confirmCheck}
            onChange={(e) => {
              setConfirmCheck(e.target.value);
            }}
          ></ConfirmInput>
          <BaseValidateTextContainer>
            {confirmMessage}
          </BaseValidateTextContainer>
        </BaseInputContainer>
      </BodyContainer>
    </UserDeleteAccountContainer>
  );
};

const UserDeleteAccountContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  margin: 2rem;
`;
const BodyContainer = styled.div``;
const TextAreaContainer = styled.div`
  margin: 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
const ConfirmInput = styled.input`
  ${GlobalTheme.input}
  width: 80%;
  font-size: ${GlobalTheme.fontSize.littleBig};
  box-sizing: border-box;
  line-height: 3rem;
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
`;
export default UserDeleteAccount;

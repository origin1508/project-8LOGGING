import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { AuthFormInitialType } from "@/types/auth/authTypes";
import ValidationUtil from "@/util/validationUtil";

interface Props {
  authFormState: AuthFormInitialType;
  onRegisterFormValueChaneEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRegisterSubmitEvent: (e: React.FormEvent) => void;
  onCheckDuplicationEvent: (endPoint: string, checkData: string) => void;
  onSendVerficationCodeClickEvent: (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => void;
  isDuplicated: {
    email: boolean;
    nickname: boolean;
  };
  isVerifiedEmail: boolean;
  setIsVerifiedEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthReigster: React.FC<Props> = ({
  authFormState,
  onRegisterFormValueChaneEvent,
  onRegisterSubmitEvent,
  onCheckDuplicationEvent,
  onSendVerficationCodeClickEvent,
  isDuplicated,
  isVerifiedEmail,
  setIsVerifiedEmail,
}) => {
  const isValidEmail = ValidationUtil.checkEmailValidate(authFormState.email);
  const isValidNickname = ValidationUtil.checkNicknameValidate(
    authFormState.nickname || ""
  );
  const isValidPassword = ValidationUtil.checkPasswordValidate(
    authFormState.password
  );
  const isPasswordSame =
    authFormState.password === authFormState.confirmPassword;
  const isValid = [
    isValidEmail,
    isValidNickname,
    isValidPassword,
    isPasswordSame,
    !isDuplicated.email,
    !isDuplicated.nickname,
  ].every((v) => v === true);
  return (
    <RegistrationFormContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="이메일"
          name="email"
          value={authFormState.email}
          isDuplicated={isDuplicated.email}
          onChange={onRegisterFormValueChaneEvent}
          onBlur={(e) => {
            onCheckDuplicationEvent("email", e.target.value);
          }}
          disabled={isVerifiedEmail && true}
        />
        {authFormState.email && !isValidEmail && (
          <BaseValidateTextContainer>
            올바른 이메일을 입력해주세요.
          </BaseValidateTextContainer>
        )}
        {isVerifiedEmail ? (
          <VerifiedEmailButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsVerifiedEmail(false);
            }}
          >
            인증확인
          </VerifiedEmailButton>
        ) : (
          <EmailVerificationButton
            type="button"
            onClick={(e) => {
              onSendVerficationCodeClickEvent(e, authFormState.email);
            }}
            disabled={!isValidEmail && true}
          >
            인증요청
          </EmailVerificationButton>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="닉네임"
          name="nickname"
          value={authFormState.nickname}
          isDuplicated={isDuplicated.nickname}
          onChange={onRegisterFormValueChaneEvent}
          onBlur={(e) => {
            onCheckDuplicationEvent("nickname", e.target.value);
          }}
        />
        {authFormState.nickname && !isValidNickname && (
          <BaseValidateTextContainer>
            닉네임을 4글자 이상 사용해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="비밀번호"
          type="password"
          name="password"
          value={authFormState.password}
          onChange={onRegisterFormValueChaneEvent}
        />
        {authFormState.password && !isValidPassword && (
          <BaseValidateTextContainer>
            8~15자 영문 소문자, 숫자, 특수문자를 사용해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          placeholder="비밀번호 재확인"
          type="password"
          name="confirmPassword"
          value={authFormState.confirmPassword}
          onChange={onRegisterFormValueChaneEvent}
        />
        {authFormState.confirmPassword && !isPasswordSame && (
          <BaseValidateTextContainer>
            비밀번호가 일치하지 않습니다.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <RegistrationButtonContainer>
        <RegistrationButton
          disabled={isValid ? false : true}
          type="submit"
          onClick={onRegisterSubmitEvent}
        >
          가입하기
        </RegistrationButton>
      </RegistrationButtonContainer>
    </RegistrationFormContainer>
  );
};

const RegistrationFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 5rem;
`;

const RegistrationInput = styled.input<{ isDuplicated?: boolean }>`
  width: 100%;
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  border-radius: ${GlobalTheme.input.borderRadius};
  padding: ${GlobalTheme.input.padding};
  box-sizing: border-box;
  line-height: 3rem;
  border: ${GlobalTheme.input.border};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-color: ${(props) => props.isDuplicated && "red"};
`;

const RegistrationButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegistrationButton = styled.button`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
  &:disabled {
    color: ${GlobalTheme.colors.lightGray};
    background-color: ${GlobalTheme.colors.gray};
  }
`;

const EmailVerificationButton = styled.button`
  ${GlobalTheme.buttons}
  border: 1px solid ${GlobalTheme.colors.theme};
  position: absolute;
  top: 18.5rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  right: 6rem;
  height: 3rem;
  cursor: pointer;
  &:disabled {
    color: ${GlobalTheme.colors.gray};
    border-color: ${GlobalTheme.colors.gray};
  }
`;

const VerifiedEmailButton = styled(EmailVerificationButton)`
  ${GlobalTheme.buttons}
  border: 1px solid green;
  color: green;
`;

export default AuthReigster;

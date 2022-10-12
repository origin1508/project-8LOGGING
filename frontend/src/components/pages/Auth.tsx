import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalTheme from "@/styles/theme";
import useRegisterForm from "@/hooks/useRegisterForm";
import useLoginForm from "@/hooks/useLoginForm";
import useCheckDuplication from "@/hooks/useCheckDuplication";
import AuthLogin from "@/components/auth/AuthLogin";
import AuthReigster from "../auth/AuthRegister";
import AuthEmailVerification from "@/components/auth/AuthEmailVerification";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import { ErrorType } from "@/types/error/errorType";
import {
  authRegisterRequest,
  authLoginRequest,
  authVerificationCodeSend,
  authVerificationCodeCheck,
} from "@/api/authFetcher";
import { useSetRecoilState } from "recoil";
import { loginUserIdState } from "@/recoil/atoms/authState";
const TapMenu = ["Sign in", "Registration"];

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);
  const [
    isOpenVerifyEmailModal,
    ,
    handleEmailVerificationModalOpenButtonClick,
    handleEmailVerificationAcceptButtonClick,
    handleEmailVerificationModalCloseButtonClick,
  ] = useModal(false);

  useEffect(() => {
    setAuthForm({
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    });
    setErrMessage("");
    setIsVerifiedEmail(false);
    setLoginValue({
      email: "",
      password: "",
    });
    setVerificationCode("");
    setIsDuplicated({
      email: false,
      nickname: false,
    });
  }, [tabIndex]);

  const { authFormState, handleAuthFormValueChange, setAuthForm } =
    useRegisterForm({
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    });

  const [loginValue, handleLoginFormChange, isValid, setLoginValue] =
    useLoginForm({
      email: "",
      password: "",
    });

  const { isDuplicated, setIsDuplicated, handleCheckDuplication } =
    useCheckDuplication({
      setErrMessage,
      handleModalOpenButtonClick,
    });

  const setLoginUserId = useSetRecoilState(loginUserIdState);

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, nickname, password } = authFormState;
    if (!isVerifiedEmail) {
      setErrMessage("Please verify email");
      handleModalOpenButtonClick();
      return;
    }
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
    try {
      const res = await authLoginRequest("/api/auth/login", {
        email,
        password,
      });
      setLoginUserId(res.userId);
      navigate("/", { replace: true });
    } catch (error) {
      const err = error as ErrorType;
      const status = err.response.data.status;
      if (status === 400) setErrMessage("Incorret email or password");
      if (status === 403) setErrMessage("Your account has been deleted");
      handleModalOpenButtonClick();
    }
  };

  const handleSendVerificationCode = async (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    e.preventDefault();
    if (isDuplicated.email) {
      return handleModalOpenButtonClick();
    }
    setErrMessage("");
    handleEmailVerificationModalOpenButtonClick();
    const res = await authVerificationCodeSend("/api/auth/email", email);
  };

  const handleEmailVerificationCheck = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { email } = authFormState;
    if (verificationCode) {
      const res = await authVerificationCodeCheck(
        "api/auth/email",
        email,
        verificationCode
      );
      if (res.success) {
        setIsVerifiedEmail(true);
        setVerificationCode("");
        handleEmailVerificationAcceptButtonClick();
      } else {
        setErrMessage(res.message);
      }
    }
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
              authFormState={authFormState}
              onRegisterFormValueChaneEvent={handleAuthFormValueChange}
              onRegisterSubmitEvent={handleRegisterSubmit}
              onCheckDuplicationEvent={handleCheckDuplication}
              onSendVerficationCodeClickEvent={handleSendVerificationCode}
              isDuplicated={isDuplicated}
              isVerifiedEmail={isVerifiedEmail}
              setIsVerifiedEmail={setIsVerifiedEmail}
            />
          )}
        </FormContainer>
      </LoginContainer>
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        {errMessage}
      </Modal>
      <Modal
        isOpenModal={isOpenVerifyEmailModal}
        onModalAcceptButtonClickEvent={handleEmailVerificationCheck}
        onModalCancelButtonClickEvent={() => {
          setVerificationCode("");
          handleEmailVerificationModalCloseButtonClick();
        }}
      >
        <AuthEmailVerification
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          errMessage={errMessage}
        />
      </Modal>
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
  height: ${(props) => (props.tabIndex === 0 ? "45rem" : "60rem")};
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

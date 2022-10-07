import React, { useEffect, useState } from "react";
import { AuthFormInitialType } from "@/types/auth/authTypes";
import { ValidationType } from "@/types/auth/validationTypes";
import ValidationUtil from "@/util/validationUtil";

const useLoginForm = (
  initialState: AuthFormInitialType
): [
  AuthFormInitialType,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  ValidationType
] => {
  const [loginValue, setLoginValue] = useState(initialState);
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const { checkEmailValidate, checkPasswordValidate } = ValidationUtil;

  useEffect(() => {
    setIsValid({
      email: checkEmailValidate(loginValue.email),
      password: checkPasswordValidate(loginValue.password),
    });
  }, [loginValue]);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginValue({ ...loginValue, [name]: value });
  };

  return [loginValue, handleLoginFormChange, isValid];
};

export default useLoginForm;

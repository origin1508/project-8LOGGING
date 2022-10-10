import React, { useEffect, useState } from "react";
import { PsEditFormInitialType } from "@/types/auth/authTypes";
import { ValidationType } from "@/types/auth/validationTypes";
import ValidationUtil from "@/util/validationUtil";

const usePsEditForm = (
  initialState: PsEditFormInitialType
): [
  PsEditFormInitialType,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  ValidationType
] => {
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const { checkPasswordValidate } = ValidationUtil;

  useEffect(() => {
    setIsValid({
      currentPassword: checkPasswordValidate(values.currentPassword),
      newPassword: checkPasswordValidate(values.currentPassword),
    });
  }, [values]);

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return [values, handleEditFormChange, isValid];
};

export default usePsEditForm;

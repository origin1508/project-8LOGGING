import React, { useEffect, useState } from "react";
import { EditFormInitialType } from "@/types/auth/authTypes";
import { ValidationType } from "@/types/auth/validationTypes";
import ValidationUtil from "@/util/validationUtil";

const UseEditForm = (
  initialState: EditFormInitialType
): [
  EditFormInitialType,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  ValidationType
] => {
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState({
    nickname: false,
    description: false,
  });
  const { checkNicknameValidate, checkDescriptionValidate } = ValidationUtil;

  useEffect(() => {
    setIsValid({
      nickname: checkNicknameValidate(values.nickname),
      description: checkDescriptionValidate(values.description),
    });
  }, [values]);

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return [values, handleEditFormChange, isValid];
};

export default UseEditForm;

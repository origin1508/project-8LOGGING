import React, { useEffect, useState } from "react";
import { PsEditFormInitialType } from "@/types/auth/authTypes";
import { ValidationType } from "@/types/auth/validationTypes";
import ValidationUtil from "@/util/validationUtil";

const usePsEditForm = (
  initialState: PsEditFormInitialType
): [
  PsEditFormInitialType,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [values, setValues] = useState(initialState);

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return [values, handleEditFormChange];
};

export default usePsEditForm;

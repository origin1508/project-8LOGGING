import React, { useState, useCallback } from "react";
import { PsEditFormInitialType } from "@/types/auth/authTypes";

const usePsEditForm = (
  initialState: PsEditFormInitialType
): [
  PsEditFormInitialType,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [values, setValues] = useState(initialState);

  const handleEditFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    [setValues]
  );

  return [values, handleEditFormChange];
};

export default usePsEditForm;

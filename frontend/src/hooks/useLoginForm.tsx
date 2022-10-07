import React, { useState } from "react";
import { AuthFormInitialType } from "@/types/auth/authTypes";

const useLoginForm = (
  initialState: AuthFormInitialType
): [AuthFormInitialType, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [loginValue, setLoginValue] = useState(initialState);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginValue({ ...loginValue, [name]: value });
  };

  return [loginValue, handleLoginFormChange];
};

export default useLoginForm;

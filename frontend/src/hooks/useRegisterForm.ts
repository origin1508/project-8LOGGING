import React, { useState, useCallback } from "react";
import { AuthFormInitialType } from "@/types/auth/authTypes";

const useRegisterForm = (initialValue: AuthFormInitialType) => {
  const [authFormState, setAuthForm] = useState(initialValue);

  const handleAuthFormValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target as HTMLInputElement;
      setAuthForm((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setAuthForm]
  );

  return { authFormState, handleAuthFormValueChange, setAuthForm };
};

export default useRegisterForm;

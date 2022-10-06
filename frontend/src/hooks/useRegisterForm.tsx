import React, { useState } from "react";
import { RegisterFormInitialType } from "@/types/auth/authTypes";

const useRegisterForm = (initialValue: RegisterFormInitialType) => {
  const [registerFormState, setRegisterForm] = useState(initialValue);

  const handleRegisterFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setRegisterForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return { registerFormState, handleRegisterFormValueChange };
};

export default useRegisterForm;

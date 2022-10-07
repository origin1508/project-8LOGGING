import React, { useState } from "react";

interface InitialStateType {
  email: string;
  password: string;
}

const useLoginForm = (
  initialState: InitialStateType
): [InitialStateType, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [loginValue, setLoginValue] = useState(initialState);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginValue({ ...loginValue, [name]: value });
  };

  return [loginValue, handleLoginFormChange];
};

export default useLoginForm;

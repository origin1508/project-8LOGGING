import React, { useState } from "react";
import { checkDuplicationRequest } from "@/api/authFetcher";

interface InitialState {
  setErrMessage: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpenButtonClick: () => void;
}

const useCheckDuplication = (initialState: InitialState) => {
  const [isDuplicated, setIsDuplicated] = useState({
    email: false,
    nickname: false,
  });
  const { setErrMessage, handleModalOpenButtonClick } = initialState;

  const handleCheckDuplication = async (
    endPoint: string,
    checkData: string
  ) => {
    try {
      if (checkData) {
        await checkDuplicationRequest(
          "api/users/validation/duplication/" + endPoint,
          checkData
        );
        setIsDuplicated((prev) => {
          return {
            ...prev,
            [endPoint]: false,
          };
        });
      }
    } catch (error) {
      setErrMessage(`${endPoint} already exist`);
      setIsDuplicated((prev) => {
        return {
          ...prev,
          [endPoint]: true,
        };
      });
      handleModalOpenButtonClick();
    }
  };
  return { isDuplicated, setIsDuplicated, handleCheckDuplication };
};

export default useCheckDuplication;

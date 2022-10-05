import { useState } from "react";

const useModal = (initialState: boolean) => {
  const [isOpenModal, setIsOpenModal] = useState(initialState);
  const [isAccepted, setIsAccepted] = useState(initialState);

  const handleModalOpenButtonClick = () => {
    setIsOpenModal(true);
  };

  const handleAcceptButtonClick = () => {
    setIsAccepted(true);
    setIsOpenModal(false);
  };

  const handleModalCloseButtonClick = () => {
    setIsOpenModal(false);
    setIsAccepted(false);
  };

  return [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ] as const;
};

export default useModal;

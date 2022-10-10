import { useState } from "react";

type ModalReturnType = [
  isOpenModal: boolean,
  isAccepted: boolean,
  handleModalOpenButtonClick: () => void,
  handleAcceptButtonClick: () => void,
  handleModalCloseButtonClick: () => void
];

const useModal = (initialState: boolean): ModalReturnType => {
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
  ];
};

export default useModal;

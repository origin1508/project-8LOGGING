import React from "react";
import * as ModalStyle from "@/components/modal/index";
import { BaseComponentType } from "@/types/common/baseComponentType";

interface ModalProps extends BaseComponentType {
  isOpenModal: boolean;
  onModalAcceptButtonClickEvent: () => void;
  onModalCancelButtonClickEvent: () => void;
}

const Modal = ({
  isOpenModal,
  onModalAcceptButtonClickEvent,
  onModalCancelButtonClickEvent,
  children,
}: ModalProps) => {
  return (
    <ModalStyle.ModalBackDrop isOpenModal={isOpenModal}>
      <ModalStyle.ModalContainer isOpenModal={isOpenModal}>
        <ModalStyle.ModalImageContainer>
          <ModalStyle.ModalImage
            src={`${process.env.PUBLIC_URL}/images/popup-cancel.png`}
            onClick={onModalCancelButtonClickEvent}
          />
        </ModalStyle.ModalImageContainer>
        {children}
        <ModalStyle.ModalButtonContainer>
          <ModalStyle.ModalAcceptButton onClick={onModalAcceptButtonClickEvent}>
            ACCEPT
          </ModalStyle.ModalAcceptButton>
          <ModalStyle.ModalButton onClick={onModalCancelButtonClickEvent}>
            CANCEL
          </ModalStyle.ModalButton>
        </ModalStyle.ModalButtonContainer>
      </ModalStyle.ModalContainer>
    </ModalStyle.ModalBackDrop>
  );
};

export default Modal;

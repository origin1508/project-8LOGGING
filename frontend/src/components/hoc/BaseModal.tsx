import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

interface BaseModalProps extends BaseComponentType {
  onCloseButtonClickEvent: () => void;
  isShow: boolean;
}
function BaseModal({
  children,
  isShow,
  onCloseButtonClickEvent,
}: BaseModalProps) {
  return (
    <ModalContainer isShow={isShow}>
      {children}
      <Button onClick={onCloseButtonClickEvent}>x</Button>
    </ModalContainer>
  );
}
interface DispalyProps {
  isShow: boolean;
}

const ModalContainer = styled.div<DispalyProps>`
  display:${(props) => (props.isShow ? `block` : `none`)}
  width: 30rem;
  height: 40rem;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

export default BaseModal;

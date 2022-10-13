import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { TextOne, TextTwo, SmallButton, BigTitle } from "@/styles/commonStyle";
import Modal from "../modal/Modal";

interface UserContentType {
  nickname: string;
  email: string;
  profPic: string;
  _id: "string";
}

export default function MemberList() {
  const [memberList, setMemberList] = useState<Array<UserContentType>>([]);
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Modal
        isOpenModal={isShow}
        isAlertModal={true}
        isShowImage={false}
        onModalCancelButtonClickEvent={() => setIsShow(false)}
      >
        <BigTitle>Member</BigTitle>
        <UsersContainer>
          <UserContainer>
            <UserImg itemProp="logo192.png"></UserImg>
            <UserInfo>
              <TextOne>들자구</TextOne>
              <TextTwo>sdhjaksdj@naver.com</TextTwo>
            </UserInfo>
            <ButtonContainer>
              <SmallButton>수락</SmallButton>
              <SmallButton>거절</SmallButton>
            </ButtonContainer>
          </UserContainer>
        </UsersContainer>
      </Modal>
    </>
  );
}

const UsersContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  height: 45rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const UserContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${GlobalTheme.colors.black};
`;
const UserImg = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-image: url(${(props) => props.itemProp});
  background-size: cover;
  border-radius: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

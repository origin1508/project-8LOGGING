import React, { useState } from "react";
import CustomIcon from "@/components/icons/CustomIcon";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import * as Api from "@/api/api";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import { TextOne, TextTwo, SmallButton } from "@/styles/commonStyle";
import Modal from "../modal/Modal";

export default function FollowList() {
  const [followList, setFollowList] = useState([]);
  const curUser = useRecoilValue(curUserState);

  const handleFollowingClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await Api.get("/api/follow/list", curUser._id);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrap>
      <FriendListContainer>
        <FriendList onClick={handleFollowingClick}>
          <CustomIcon
            name="following"
            size="15"
            color={GlobalTheme.colors.white}
          />
        </FriendList>
        <Following>following</Following>
      </FriendListContainer>

      <UsersContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
        <UserContainer>
          <UserImg itemProp="./123.jpeg"></UserImg>
          <UserInfo>
            <TextOne>들자구</TextOne>
            <TextTwo>eodnsdlekd@naver.com</TextTwo>
          </UserInfo>
          <SmallButton>프로필</SmallButton>
        </UserContainer>
      </UsersContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-left: 30rem;
`;

const FriendListContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  gap: 1rem;
`;
const FriendList = styled.div`
  width: 3rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${GlobalTheme.colors.theme};
`;

const Following = styled.div`
  font-size: ${GlobalTheme.fontSize.littleBig};
  font-family: ${GlobalTheme.fontStyle.bold};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UsersContainer = styled.div`
  width: 40rem;
  overflow-y: scroll;
  height: 65rem;
  border-radius: 1rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomIcon from "@/components/icons/CustomIcon";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import * as Api from "@/api/api";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import {
  TextOne,
  TextTwo,
  SmallButton,
  MediumTitle,
} from "@/styles/commonStyle";
import Modal from "../modal/Modal";

interface UserContentType {
  nickname: string;
  email: string;
  profPic: string;
  _id: "string";
}

export default function FollowList() {
  const [followList, setFollowList] = useState<Array<UserContentType>>([]);
  const curUser = useRecoilValue(curUserState);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleFollowingClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsShow(true);
      const res = await Api.get("/api/follow/list", curUser._id);
      setFollowList(res.data.datas);
      console.log(followList);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
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
      <Modal
        isOpenModal={isShow}
        isAlertModal={true}
        isShowImage={false}
        onModalCancelButtonClickEvent={() => setIsShow(false)}
      >
        <MediumTitle>팔로잉</MediumTitle>
        <UsersContainer>
          {followList.map((user) => (
            <UserContainer key={user.nickname}>
              <UserImg itemProp={user.profPic}></UserImg>
              <UserInfo>
                <TextOne>{user.nickname}</TextOne>
                <TextTwo>{user.email}</TextTwo>
              </UserInfo>
              <SmallButton onClick={() => navigate(`/profile/${user._id}`)}>
                프로필
              </SmallButton>
            </UserContainer>
          ))}
        </UsersContainer>
      </Modal>
    </>
  );
}

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

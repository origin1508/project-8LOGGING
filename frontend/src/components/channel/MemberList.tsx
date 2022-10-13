import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";
import { TextOne, TextTwo, SmallButton, BigTitle } from "@/styles/commonStyle";
import { ChannelMemberType, waitListType } from "@/types/channel/channelTypes";

interface MemberListProps {
  channelMemberList: ChannelMemberType[];
  waitMemberList: waitListType[];
}

export default function MemberList({
  channelMemberList,
  waitMemberList,
}: MemberListProps) {
  const navigate = useNavigate();

  return (
    <MemberListWrapper>
      <MemberListContainer>
        <BigTitle>Members</BigTitle>
        <NewPeopleContainer>
          <IconBox>
            <CustomIcon
              name="following"
              size="30"
              color={GlobalTheme.colors.theme}
            ></CustomIcon>
            <Notification>{waitMemberList.length}</Notification>
          </IconBox>
        </NewPeopleContainer>
        {channelMemberList.map((data) => {
          return (
            <UserContainer key={data.memberId}>
              <UserInfo onClick={() => navigate(`/profile/${data.memberId}`)}>
                <UserImg itemProp={data.memberPic}></UserImg>
                <TextOne>{data.memberNickname}</TextOne>
              </UserInfo>
              <SmallButton>follow</SmallButton>
            </UserContainer>
          );
        })}
      </MemberListContainer>

      {waitMemberList &&
        waitMemberList.map((data) => {
          return (
            <WaitListContainer key={data.userId}>
              <BigTitle>Waiting Member</BigTitle>
              <UserContainer>
                <UserInfo onClick={() => navigate(`/profile/${data.userId}`)}>
                  <UserImg itemProp={data.profPic}></UserImg>
                  <TextOne>{data.nickname}</TextOne>
                </UserInfo>
                <ButtonContainer>
                  <SmallButton>수락</SmallButton>
                  <SmallButton>거절</SmallButton>
                </ButtonContainer>
              </UserContainer>
            </WaitListContainer>
          );
        })}
    </MemberListWrapper>
  );
}
const MemberListWrapper = styled.div`
  position: relative;
  width: 20%;
  height: 65rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 1rem;
  margin-left: 2rem;
`;

const MemberListContainer = styled.div`
  padding: 3rem;
  width: 80%;
  height: 100%;
`;
const WaitListContainer = styled.div`
  display: none;
  position: absolute;
  padding: 3rem;
  width: 80%;
  height: 60%;
  border-radius: 8px;
  background-color: ${GlobalTheme.colors.lightTwoGray};
`;
const UserContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: center;
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
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconBox = styled.div`
  position: relative;
`;

const NewPeopleContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  cursor: pointer;
  right: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

const Notification = styled.span`
  font-size: 0.8rem;
  height: 1.75rem;
  width: 1.75rem;
  background-color: #eb2f64;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 1.2rem;
  right: -0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

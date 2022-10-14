import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";
import { TextOne, TextTwo, SmallButton, BigTitle } from "@/styles/commonStyle";
import { ChannelMemberType, waitListType } from "@/types/channel/channelTypes";
import BaseCardContainerStyle from "@/components/hoc/BaseCardContainer";
interface MemberListProps {
  channelMemberList: ChannelMemberType[];
  waitMemberList: waitListType[];
  isOwner: boolean;
  isShowWaitList: boolean;
  setIsShowWaitList: React.Dispatch<React.SetStateAction<boolean>>;
  onChannelJoinAcceptEvenet: (waitingId: string) => void;
}

export default function MemberList({
  channelMemberList,
  waitMemberList,
  isOwner,
  isShowWaitList,
  setIsShowWaitList,
  onChannelJoinAcceptEvenet,
}: MemberListProps) {
  const navigate = useNavigate();

  return (
    <MemberListWrapper>
      <MemberListContainer>
        <BigTitle>Members</BigTitle>
        {isOwner && (
          <NewPeopleContainer
            onClick={() => {
              console.log(isShowWaitList);
              setIsShowWaitList((prev) => !prev);
            }}
          >
            <IconBox>
              <CustomIcon
                name="following"
                size="30"
                color={GlobalTheme.colors.theme}
              ></CustomIcon>
              <Notification>{waitMemberList.length}</Notification>
            </IconBox>
          </NewPeopleContainer>
        )}
        {channelMemberList.map((data) => {
          return (
            <UserContainer key={data.memberId}>
              <UserInfo onClick={() => navigate(`/profile/${data.memberId}`)}>
                <UserImg itemProp={data.memberPic}></UserImg>
                <TextOne>{data.memberNickname}</TextOne>
              </UserInfo>
            </UserContainer>
          );
        })}
      </MemberListContainer>
      <WaitListContainer isShowWaitList={isShowWaitList}>
        <BigTitle>Waiting Member</BigTitle>
        {waitMemberList.map((data) => {
          return (
            <UserContainer key={data.userId}>
              <UserInfo onClick={() => navigate(`/profile/${data.userId}`)}>
                <UserImg itemProp={data.profPic}></UserImg>
                <TextOne>{data.nickname}</TextOne>
              </UserInfo>
              <ButtonContainer>
                <SmallButton
                  onClick={() => {
                    onChannelJoinAcceptEvenet(data.userId);
                  }}
                >
                  수락
                </SmallButton>
                <SmallButton>거절</SmallButton>
              </ButtonContainer>
            </UserContainer>
          );
        })}
      </WaitListContainer>

      {isOwner ? (
        <ChannelButton>채널 삭제</ChannelButton>
      ) : (
        <ChannelButton>채널 나가기</ChannelButton>
      )}
    </MemberListWrapper>
  );
}
const MemberListWrapper = styled.div`
  position: relative;
  width: 35rem;
  height: 90%;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-left: 1rem;
`;

const MemberListContainer = styled.div`
  padding: 3rem;
  width: 80%;
  height: 90%;
  vertical-align: middle;
`;
const WaitListContainer = styled.div<{ isShowWaitList: boolean }>`
  display: ${(props) => (props.isShowWaitList ? "" : "none")};
  position: absolute;
  top: 8rem;
  padding: 3rem;
  width: 70%;
  height: 60%;
  border-radius: 8px;
  background-color: ${GlobalTheme.colors.lightTwoGray};
  box-shadow: 1px 1px 5px ${GlobalTheme.colors.gray};
`;
const UserContainer = styled.div`
  margin-top: 2rem;
  // display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
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

const ChannelButton = styled.button`
  ${GlobalTheme.buttons}
  height: 5rem;
  width: 80%;
  margin-bottom: 2rem;
`;

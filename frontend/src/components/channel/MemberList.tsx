import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";
import { TextOne, SmallButton, BigTitle } from "@/styles/commonStyle";
import { ChannelMemberType, waitListType } from "@/types/channel/channelTypes";
import LoadingCycle from "@/components/loading/LoadingCycle";

interface MemberListProps {
  channelMemberList: ChannelMemberType[];
  waitMemberList: waitListType[];
  isOwner: boolean;
  ownerId: string;
  isShowWaitList: boolean;
  isLoading: boolean;
  setIsShowWaitList: React.Dispatch<React.SetStateAction<boolean>>;
  onChannelJoinPermissionButtonClickEvent: (
    e: React.MouseEvent<HTMLButtonElement>,
    waitingId: string
  ) => void;
  onChannelLeaveEvent: () => void;
}

function MemberList({
  channelMemberList,
  waitMemberList,
  isOwner,
  ownerId,
  isShowWaitList,
  isLoading,
  setIsShowWaitList,
  onChannelJoinPermissionButtonClickEvent,
  onChannelLeaveEvent,
}: MemberListProps) {
  const navigate = useNavigate();
  const [members, setMembers] =
    useState<ChannelMemberType[]>(channelMemberList);
  const [memberName, setMemberName] = useState("");

  const memberSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchMember = channelMemberList.filter((member) =>
      member.memberNickname.includes(value)
    );
    setMemberName(value);
    setMembers(searchMember);
  };

  return (
    <MemberListWrapper>
      <MemberListContainer>
        <BigTitle>Members</BigTitle>
        <Search>
          <SearchInput
            type="text"
            placeholder="맴버 검색"
            name="keyword"
            value={memberName}
            onChange={memberSearch}
          ></SearchInput>
          <SearchButton>
            <CustomIcon name="SeachIcon" size="20" color="black"></CustomIcon>
          </SearchButton>
        </Search>
        {isOwner && (
          <NewPeopleContainer
            onClick={() => {
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
        {members.map((data) => {
          return (
            <UserContainer key={data.memberId}>
              <UserInfo onClick={() => navigate(`/profile/${data.memberId}`)}>
                <UserImg itemProp={data.memberPic}></UserImg>
                <TextOne>{data.memberNickname}</TextOne>
                {ownerId === data.memberId && (
                  <CustomIcon
                    name="crown"
                    size="30"
                    color={GlobalTheme.colors.theme}
                  ></CustomIcon>
                )}
              </UserInfo>
            </UserContainer>
          );
        })}
      </MemberListContainer>
      <WaitListContainer isShowWaitList={isShowWaitList}>
        <BigTitle>Waiting List</BigTitle>
        {waitMemberList.map((data) => {
          return (
            <UserContainer key={data.userId}>
              <UserInfo onClick={() => navigate(`/profile/${data.userId}`)}>
                <UserImg itemProp={data.profPic}></UserImg>
                <TextOne>{data.nickname}</TextOne>
              </UserInfo>
              <ButtonContainer>
                <AcceptButton
                  name="accept"
                  onClick={(e) => {
                    onChannelJoinPermissionButtonClickEvent(e, data.userId);
                  }}
                >
                  수락
                </AcceptButton>
                <RejectButton
                  name="reject"
                  onClick={(e) => {
                    onChannelJoinPermissionButtonClickEvent(e, data.userId);
                  }}
                >
                  거절
                </RejectButton>
              </ButtonContainer>
              {isLoading && <LoadingCycle />}
            </UserContainer>
          );
        })}
      </WaitListContainer>

      {isOwner ? (
        <ChannelButton>채널 삭제</ChannelButton>
      ) : (
        <ChannelButton onClick={onChannelLeaveEvent}>채널 나가기</ChannelButton>
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
  margin-right: 1rem;
`;

const MemberListContainer = styled.div`
  padding: 3rem;
  width: 80%;
  height: 90%;
  vertical-align: middle;
`;

const WaitListContainer = styled.div<{ isShowWaitList: boolean }>`
  position: absolute;
  top: 8rem;
  padding: 3rem;
  width: 70%;
  height: 60%;
  transform: scale(0);
  transform-origin: 90% -4%;
  border-radius: 2px;
  transition: all 0.25s ease;
  background-color: ${GlobalTheme.colors.lightTwoGray};
  box-shadow: 1px 1px 5px ${GlobalTheme.colors.gray};
  ${(props) => props.isShowWaitList && "transform: scale(1);"};
`;

const UserContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
  position: relative;
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
  width: 100%;
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

const AcceptButton = styled(SmallButton)`
  width: 4.5rem;
`;
const RejectButton = styled(SmallButton)`
  width: 4.5rem;
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  border: 1px solid ${GlobalTheme.colors.theme};
`;
const Search = styled.form`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchInput = styled.input`
  font-family: inherit;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: inherit;
  background-color: ${GlobalTheme.colors.white};
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 2rem;
  width: 50%;
  transition: all 0.2s;
  margin-right: -3.25rem; // 서치아이콘 인풋위에 올라감
  box-shadow: 0px 5px 6px -3px rgb(145 158 171 / 20%),
    0px 9px 12px 1px rgb(145 158 171 / 14%),
    0px 3px 16px 2px rgb(145 158 171 / 12%);
`;
const SearchButton = styled.button`
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
  }
`;
export default MemberList;

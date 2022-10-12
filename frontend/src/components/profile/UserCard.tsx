import React, { useState } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import { BigTitle, TitleContainer } from "@/styles/commonStyle";
import CustomIcon from "@/components/icons/CustomIcon";
import * as Api from "@/api/api";

interface ImgProps {
  img?: string;
}
interface UserCardProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteAccountModalOpenClickEvent: () => void;
  isEditable?: boolean;
}

function UserCard({
  isEditable,
  setIsEditing,
  onDeleteAccountModalOpenClickEvent,
}: UserCardProps) {
  const curUser = useRecoilValue(curUserState);
  const [followed, setFollowed] = useState(true);

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  const handleFollowClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!followed) {
        await Api.post("/api/follow", { targetId: curUser._id });
        console.log("팔로우");
        setFollowed(true);
      } else {
        await Api.del("/api/follow", { targetId: curUser._id });
        console.log("팔로우취소");
        setFollowed(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BaseCardContainer width="40rem">
      <TitleContainer>
        <BigTitle>
          {isEditable ? `My` : `${curUser.nickname}'s`} PROFILE
        </BigTitle>
      </TitleContainer>
      <Img img={curUser?.profPic}></Img>
      {isEditable && (
        <FriendListContainer>
          <FriendList>
            <CustomIcon
              name="following"
              size="15"
              color={GlobalTheme.colors.white}
            />
          </FriendList>
          <Following>following</Following>
        </FriendListContainer>
      )}

      <InforContainer>
        <UserNicname>{curUser?.nickname}</UserNicname>
        <UserEmail>{curUser?.email}</UserEmail>
        <UserDescription>{curUser?.description}</UserDescription>
        <FollowButton onClick={handleFollowClick}>Follow</FollowButton>
        {isEditable && (
          <>
            <Button onClick={handlerEditClick}>Edit</Button>
            <Button onClick={onDeleteAccountModalOpenClickEvent}>
              Delete Account
            </Button>
          </>
        )}
      </InforContainer>
    </BaseCardContainer>
  );
}

const Img = styled.div<ImgProps>`
  width: 7rem;
  height: 7rem;
  background-image: url(${(props) => props.img});
  background-size: cover;
  border-radius: 100%;
  margin-bottom: 2rem;
`;
const InforContainer = styled.div`
  display: flex;
  background-color: ${GlobalTheme.colors.lightThreeGray};
  border-radius: 1rem;
  width: 80%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 1rem;
  font-size: ${GlobalTheme.fontSize.medium};
`;

const UserNicname = styled.h3``;

const UserEmail = styled.span``;

const UserDescription = styled.span``;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: 80%;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  cursor: pointer;

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

const FollowButton = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: 50%;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
`;
export default UserCard;

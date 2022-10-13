import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { EditButton } from "@/styles/commonStyle";

interface ProfileImageProp {
  backgroundImg?: string;
}

interface UserImageUpdateProps {
  profileImagePreview: string | ArrayBuffer | FileReader | null | undefined;
  onChannelImageUploadClickEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onProfileImageUploadClickEvent: () => void;
}

const UserImageUpdate = ({
  profileImagePreview,
  onChannelImageUploadClickEvent,
  onProfileImageUploadClickEvent,
}: UserImageUpdateProps) => {
  return (
    <UserImageContainer>
      <UserImageUploadTitle>Profile upload</UserImageUploadTitle>
      <UserImageInputWrapper>
        <UserImageUploadInput
          type="file"
          onChange={onChannelImageUploadClickEvent}
        />
      </UserImageInputWrapper>
      <ProfileImageBox backgroundImg={profileImagePreview as string} />
      <EditButton onClick={onProfileImageUploadClickEvent}>
        CHANGE PROFILE IMAGE
      </EditButton>
    </UserImageContainer>
  );
};

const UserImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  margin-top: 1rem;
  font-size: ${GlobalTheme.fontSize.default};
`;

const UserImageUploadTitle = styled.h1`
  font-size: ${GlobalTheme.fontSize.big2};
  line-height: 1rem;
  margin-bottom: 3rem;
`;

const UserImageInputWrapper = styled.div`
  height: auto;
  text-align: left;
  margin-bottom: 2rem;
`;

const UserImageUploadInput = styled.input`
  cursor: pointer;
`;

const ProfileImageBox = styled.div<ProfileImageProp>`
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: block;
  width: 25rem;
  height: 25rem;

  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default UserImageUpdate;

import React from "react";

import styled from "styled-components";
import User from "./User";
import ChannelHistory from "./ChannelHistory";
function Profile() {
  return (
    <ProfileContainer>
      <User />
      <ChannelHistory />
    </ProfileContainer>
  );
}
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30rem;
  height: 100%;
  gap: 4rem;
`;

export default Profile;

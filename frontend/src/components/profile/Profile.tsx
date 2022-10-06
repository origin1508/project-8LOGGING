import React from "react";
import styled from "styled-components";
import User from "./User";
import ChannelHistory from "./ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";

function Profile() {
  return (
    <BasePageComponent>
      {/* <ProfileContainer> */}
      <User />
      <ChannelHistory />
      {/* </ProfileContainer> */}
    </BasePageComponent>
  );
}

// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 4rem;
// `;

export default Profile;

import React from "react";
import User from "../profile/User";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";

function Profile() {
  return (
    <BasePageComponent>
      <User />
      <ChannelHistory />
    </BasePageComponent>
  );
}

export default Profile;

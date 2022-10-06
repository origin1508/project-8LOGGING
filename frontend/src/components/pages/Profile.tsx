import React, { useState } from "react";
import User from "../profile/User";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";

function Profile() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <BasePageComponent>
      <User isEditing={isEditing} setIsEditing={setIsEditing} />
      <ChannelHistory />
    </BasePageComponent>
  );
}

export default Profile;

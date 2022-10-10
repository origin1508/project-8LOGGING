import React, { useState } from "react";
import styled from "styled-components";
import UserInfoEditForm from "./UserInfoEditForm";
import UserPsEditForm from "./UserPsEditForm";
interface UserCardEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
function UserEdit({ setIsEditing }: UserCardEditProps) {
  const [isPsEditing, setIsPsEditing] = useState(false);
  return (
    <EditCardContainer>
      {isPsEditing ? (
        <UserPsEditForm
          setIsEditing={setIsEditing}
          setIsPsEditing={setIsPsEditing}
        />
      ) : (
        <UserInfoEditForm
          setIsEditing={setIsEditing}
          setIsPsEditing={setIsPsEditing}
        />
      )}
    </EditCardContainer>
  );
}

const EditCardContainer = styled.div``;

export default UserEdit;

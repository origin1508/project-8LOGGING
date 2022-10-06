import React, { useState } from "react";
import UserCard from "./UserCard";
import UserEditForm from "./UserEditForm";
import styled from "styled-components";

function User() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <UserContainer>
      <UserCardContainer>
        {isEditing ? (
          <UserEditForm setIsEditing={setIsEditing} />
        ) : (
          <UserCard setIsEditing={setIsEditing} />
        )}
      </UserCardContainer>
    </UserContainer>
  );
}
const UserContainer = styled.div`
  display: flex;
`;
const UserCardContainer = styled.div`
  display: flex;
`;

export default User;

import React, { useState } from "react";
import UserCard from "./UserCard";
import UserEditForm from "./UserEditForm";
import styled from "styled-components";

function User() {
  const [isEditing, setIsEditing] = useState<boolean>(true);

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
  margin-left: 30rem;
  width: 100%;
  height: 100%;
`;
const UserCardContainer = styled.div`
  display: flex;
`;

export default User;

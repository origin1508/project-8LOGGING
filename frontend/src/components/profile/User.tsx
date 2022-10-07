import React from "react";
import UserCard from "./UserCard";
import UserEditForm from "./UserEditForm";
import styled from "styled-components";

interface UserProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}

function User({ isEditing, setIsEditing }: UserProps) {
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
  margin-right: 3rem;
`;
const UserCardContainer = styled.div`
  display: flex;
`;

export default User;

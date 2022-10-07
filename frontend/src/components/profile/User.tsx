import React from "react";
import UserCard from "./UserCard";
import UserEditForm from "./UserEditForm";
import styled from "styled-components";
import { IUser } from "@/recoil/atoms/authState";

interface UserProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
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

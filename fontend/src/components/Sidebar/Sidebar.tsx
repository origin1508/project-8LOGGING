import React from "react";
import Channel from "./Channel";
import { SidebarData } from "./SidebarData";

import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  height: 100%;
  width: 20rem;
  padding: 1rem;
  margin-left: 1.5rem;
  background: #white;

  font-size: ${GlobalTheme.fontSize.big};
`;

const Logo = styled.div`
  margin: 1rem;
  font-size: ${GlobalTheme.fontSize.big};

  margin-bottom: 3rem;
`;

const MenuContainer = styled.div`
  width: 100%;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 10rem;
  margin-top: 5rem;
`;

const SearchInput = styled.input`
  width: 20rem;
  height: 4rem;
  background: #fafafa;
  border: none;
  border-radius: 4px;
  text-align: center;
`;
const MenuItem = styled.div`
  margin-bottom: 3rem;
`;
const MenuLink = styled.a`
  text-decoration: none;
  color: #848484;
`;

const Button = styled.button`
  width: 100%;
  background: white;
  border: none;
  cursor: pointer;
`;
const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>8LOGGING</Logo>
      <Button>Login</Button>
      <SearchContainer>
        <SearchInput placeholder="Search"></SearchInput>
      </SearchContainer>
      <MenuContainer>
        {SidebarData.map((item, index) => {
          return (
            <MenuItem key={index}>
              <MenuLink href={item.path}>{item.title}</MenuLink>
            </MenuItem>
          );
        })}
      </MenuContainer>
      <Channel />
    </SidebarContainer>
  );
};

export default Sidebar;

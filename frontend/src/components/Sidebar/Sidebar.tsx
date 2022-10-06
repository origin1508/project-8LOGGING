import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Channel from "./Channel";
import { SidebarData } from "./sidebarData";

import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogoImageClick = () => {
    navigate("/");
  };

  return (
    <SidebarContainer>
      <Logo onClick={handleLogoImageClick}>
        <LogoImg src={`${process.env.PUBLIC_URL}/images/plogging_logo.png`} />
      </Logo>
      <LoginButton to="/login">Login</LoginButton>
      <SearchContainer>
        <SearchInput placeholder="Search"></SearchInput>
      </SearchContainer>
      <MenuContainer>
        {SidebarData.map((item, index) => {
          return (
            <MenuItem key={index}>
              <MenuLink to={item.path}>{item.title}</MenuLink>
            </MenuItem>
          );
        })}
      </MenuContainer>
      <Channel />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  height: 100%;
  width: 20rem;
  padding: 3rem;
  background-color: ${GlobalTheme.colors.white};

  font-size: ${GlobalTheme.fontSize.big};
`;

const Logo = styled.div`
  cursor: pointer;
  margin: 1rem;
  font-size: ${GlobalTheme.fontSize.big};
  margin-bottom: 3rem;
`;

const LogoImg = styled.img`
  width: auto;
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
  background-color: ${GlobalTheme.colors.lightGray};
  border: none;
  border-radius: 4px;
  text-align: center;
`;
const MenuItem = styled.div`
  margin-bottom: 3rem;
`;
const MenuLink = styled(Link)`
  text-decoration: none;
  color: #848484;
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  color: ${GlobalTheme.colors.gray};
`;

export default Sidebar;

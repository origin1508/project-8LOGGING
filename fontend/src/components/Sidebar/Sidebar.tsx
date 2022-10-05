import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  height: 100%;
  width: 18rem;
  padding: 1rem;
  background: #fafafa;

  font-size: ${GlobalTheme.fontSize.big};
`;

const LogoContainer = styled.div`
  margin: 1rem;
  font-size: ${GlobalTheme.fontSize.big};
`;

const MenuContainer = styled.div``;

const ChannelContainer = styled.div``;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <h1>8LOGGING</h1>
      </LogoContainer>
      <MenuContainer>
        <li>Login</li>
        <li>About plogging</li>
        <li>Recruiting channel</li>
        <li>Region</li>
        <li>Friend list</li>
      </MenuContainer>
      <ChannelContainer>Channel</ChannelContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

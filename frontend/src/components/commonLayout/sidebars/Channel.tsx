import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import { loginUserIdState } from "@/recoil/atoms/authState";
import CustomIcon from "@/components/icons/CustomIcon";
import { getAuthInformationById } from "@/api/authFetcher";

interface ChannelContainerProps {
  isToggle: boolean;
}

const Channel: React.FC = () => {
  const [isToggle, setIsToggle] = useState(false);

  const loginUserId = useRecoilValue(loginUserIdState);
  const [sidebarChannels, setSidebarChannels] =
    useRecoilState(sidebarChannelsState);

  useEffect(() => {
    (async () => {
      const res = await getAuthInformationById(
        "/api/users/userinfo",
        loginUserId
      );
      setSidebarChannels(res.channels);
    })();
  }, []);

  return (
    <ChannelsContainer>
      <TitleContainer>
        <ChannelTitle>Channel</ChannelTitle>
        <ToggleIcon onClick={() => setIsToggle(!isToggle)}>
          {!isToggle ? (
            <CustomIcon
              name="toggleDown"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          ) : (
            <CustomIcon
              name="toggleUp"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          )}
        </ToggleIcon>
      </TitleContainer>

      <ChannelContainer isToggle={!isToggle}>
        {sidebarChannels.map((channel, index) => {
          return (
            <ChannelLink key={index} to={`/channels/${channel._id}`}>
              {channel.title}
            </ChannelLink>
          );
        })}
      </ChannelContainer>
    </ChannelsContainer>
  );
};

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${GlobalTheme.fontSize.default}
  magin-top: 20rem;
`;

const ChannelLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 3rem;
  color: ${GlobalTheme.colors.gray};
`;

const ChannelTitle = styled.div`
  width: 100%;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-weight: bold;
  text-align: left;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;
const ChannelContainer = styled.div<ChannelContainerProps>`
  display: flex;
  overflow: auto;
  padding-top: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar {
      display: block;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${GlobalTheme.colors.theme};
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: ${GlobalTheme.colors.lightThreeGray};
    }
  }
  ${(props) =>
    props.isToggle
      ? `visibility: hidden;
  height: 0vh;`
      : `visibility: visible;
  height: 30vh;`}
  flex-direction: column;
  transition: all 0.4s;
  &:active {
    transform: translateY(-0.1rem);
  }
`;
const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    scale: 1.2;
  }
`;

export default Channel;

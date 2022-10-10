import React, { useState } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";

interface ChannelContainerProps {
  isToggle: boolean;
}
const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${GlobalTheme.fontSize.default}
  magin-top: 20rem;
`;

const ChannelLink = styled.a`
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
  overflow: hidden;

  ${(props) =>
    props.isToggle
      ? `visibility: hidden;
  height: 0vh;`
      : `visibility: visible;
  height: 20vh;`}
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
const channels = [
  {
    title: "channel one",
  },
  {
    title: "channel two",
  },
  {
    title: "channel three",
  },
];

const Channel: React.FC = () => {
  const [isToggle, setIsToggle] = useState(false);
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
        {channels.map((channel, index) => {
          return <ChannelLink key={index}>{channel.title}</ChannelLink>;
        })}
      </ChannelContainer>
    </ChannelsContainer>
  );
};

export default Channel;

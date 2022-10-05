import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const ChannelContainer = styled.div`
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
  margin-top: 5rem;
  margin-bottom: 3rem;
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
  return (
    <ChannelContainer>
      <ChannelTitle>Channel</ChannelTitle>
      {channels.map((channel, index) => {
        return <ChannelLink key={index}>{channel.title}</ChannelLink>;
      })}
    </ChannelContainer>
  );
};

export default Channel;

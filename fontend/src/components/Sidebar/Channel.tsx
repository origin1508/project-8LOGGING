import React from "react";
import styled from "styled-components";

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  magin-top: 20rem;
`;

const ChannelLink = styled.a`
  text-decoration: none;
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
      Channel
      {channels.map((channel, index) => {
        return <ChannelLink key={index}>{channel.title}</ChannelLink>;
      })}
    </ChannelContainer>
  );
};

export default Channel;

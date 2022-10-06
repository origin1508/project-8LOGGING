import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelHistoryCard from "./ChannelHistoryCard";

function ChannelHistory() {
  return (
    <ChannelHistoryContainer>
      <TitleContainer>
        <Title>CHANNEL HISTORY</Title>
      </TitleContainer>
      <CardContainer>
        <ChannelHistoryCard />
        <ChannelHistoryCard />
        <ChannelHistoryCard />
        <ChannelHistoryCard />
        <ChannelHistoryCard />
        <ChannelHistoryCard />
      </CardContainer>
    </ChannelHistoryContainer>
  );
}

const ChannelHistoryContainer = styled.div`
  overflow: hidden;
  width: 60rem;
  height: 65rem;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const TitleContainer = styled.div`
  padding: 2rem;
  height: 20%;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  margin-left: 2rem;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  overflow-y: scroll;
`;

export default ChannelHistory;

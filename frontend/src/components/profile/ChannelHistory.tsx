import React, { useState } from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelHistoryCard from "./ChannelHistoryCard";
import { SmallButton, BigTitle } from "@/styles/commonStyle";
import * as Api from "@/api/api";
function ChannelHistory() {
  // const handleClickButton = async () => {
  //   try {
  //     const res = await Api.get("/api/users/channelhistory");
  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const [tabIndex, setTabIndex] = useState(0);
  const TapMenu = ["생성한 채널", "가입한 채널"];
  return (
    <ChannelHistoryContainer>
      <TitleContainer>
        <BigTitle>Channel</BigTitle>
        <ChannelTaps>
          {TapMenu.map((menu, index) => {
            return (
              <Tab
                onClick={() => {
                  setTabIndex(index);
                }}
                key={index}
                style={{
                  borderBottom:
                    tabIndex === index
                      ? `2px solid ${GlobalTheme.colors.theme}`
                      : "none",
                  color:
                    tabIndex === index
                      ? GlobalTheme.colors.black
                      : GlobalTheme.colors.gray,
                }}
              >
                {menu}
              </Tab>
            );
          })}
        </ChannelTaps>
        {/* <SmallButton onClick={handleClickButton}>api</SmallButton> */}
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

const ChannelTaps = styled.div`
  display: flex;
  margin-left: 2rem;
  height: 3rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  margin-top: 3.8rem;
`;
const Tab = styled.div`
  margin-right: 3rem;
  cursor: pointer;
`;

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
  height: 8rem;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  overflow-y: scroll;
`;

export default ChannelHistory;

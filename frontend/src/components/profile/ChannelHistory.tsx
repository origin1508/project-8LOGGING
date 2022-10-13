import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import GlobalTheme from "@/styles/theme";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import { BigTitle } from "@/styles/commonStyle";
import { currentChannelDetailRequest } from "@/api/channelFetcher";
import { ChannelDetailType } from "@/types/channel/channelTypes";
import ChannelDetail from "../channelDetail/ChannelDetail";

function ChannelHistory() {
  const curUser = useRecoilValue(curUserState);
  const channels = curUser.channels;
  const [tabIndex, setTabIndex] = useState(0);
  const TapMenu = ["생성 채널", "가입 채널", "가입 대기 채널"];
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [isShowMore, setIsShowMore] = useState(false);
  const [channelDetailInfo, setChannelDetailInfo] = useState<
    ChannelDetailType[]
  >([]);

  const handleMoreClick = async (channelUuid: string) => {
    const res = await currentChannelDetailRequest(
      `/api/channels/${channelUuid}`
    );
    setChannelDetailInfo([res.datas]);
    setSelectedChannelId(res.datas._id);
    setIsShowMore(true);
  };

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
        {channels.map((ch) =>
          ch.position === tabIndex ? (
            <ChannelCard
              key={ch._id}
              img={ch.img}
              title={ch.title}
              channelUuid={ch._id}
              curMemberNum={`${ch.memberNum}/${ch.curMemberNum}`}
              locationDist={ch.locationDist}
              locationCity={ch.locationCity}
              onMoreClick={handleMoreClick}
            />
          ) : (
            ""
          )
        )}
      </CardContainer>
      <ChannelDetail
        isShowMore={isShowMore}
        setIsShowMore={setIsShowMore}
        channelDetailInfo={channelDetailInfo}
        onEnterDecideClickEvent={(s) => console.log(s)}
        selectedChannelId={selectedChannelId}
      />
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
  align-items: center;
  flex-wrap: wrap;
  gap: rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  & > * {
    margin-bottom: 2rem;
  }
`;

export default ChannelHistory;

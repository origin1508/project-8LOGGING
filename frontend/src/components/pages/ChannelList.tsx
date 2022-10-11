import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import { currentChannelListRequest } from "@/api/channelFetcher";
import { ChannelsType } from "@/types/channel/channelTypes";
import { BigTitle, BigButton } from "@/styles/commonStyle";
import GlobalTheme from "@/styles/theme";

const ChannelList = () => {
  const [channels, setChannels] = useState<Array<ChannelsType>>([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/channels/create");
  };
  const handleDetailClick = (channelUuid: string) => {
    navigate(`/channels/${channelUuid}`);
  };

  useEffect(() => {
    (async () => {
      const { datas } = await currentChannelListRequest("/api/channels");
      setChannels(datas);
    })();
  }, []);
  return (
    <BasePageComponent>
      <ChannelListContiner>
        <ChannelListForm>
          <TitleContainer>
            <BigTitle>Recruting Channel</BigTitle>
            <BigButton onClick={handleClick}>채널생성하기</BigButton>
          </TitleContainer>

          <CardsContainer>
            {channels.map((ch) => (
              <ChannelCard
                key={ch._id}
                imgUrl={ch.imgUrl}
                title={ch.title}
                channelUuid={ch._id}
                curMemberNum={ch.curMemberNum}
                locationDist={ch.locationDist}
                onDetailClickEvent={handleDetailClick}
              />
            ))}
          </CardsContainer>
        </ChannelListForm>
      </ChannelListContiner>
    </BasePageComponent>
  );
};

const ChannelListContiner = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
`;
const CardsContainer = styled.div`
  padding-left: 7rem;
  overflow-y: scroll;
  display: flex;
  height: 80%;
  align-itmes: center;
  flex-wrap: wrap;
  gap: 5rem;
`;
const TitleContainer = styled.div`
  padding: 3rem 0rem;
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
const ChannelListForm = styled.div`
  width: 110rem;
  overflow: hidden;
  height: 80rem;
  border-radius: 1rem;
  background-color: ${GlobalTheme.colors.lightGray};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export default ChannelList;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BaseGridPageComponent from "@/components/hoc/BaseGridPageComponent";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import { currentChannelListRequest } from "@/api/channelFetcher";
import { ChannelsType } from "@/types/channel/channelTypes";

const ChannelList = () => {
  const [channels, setChannels] = useState<Array<ChannelsType>>([]);

  useEffect(() => {
    (async () => {
      const { datas } = await currentChannelListRequest("/api/channels");
      setChannels(datas);
    })();
  }, []);

  return (
    <BaseGridPageComponent>
      <ChannelListContainer>
        {channels.map((ch) => (
          <ChannelCard
            key={ch._id}
            imgUrl={ch.imgUrl}
            title={ch.title}
            curMemberNum={ch.curMemberNum}
            locationDist={ch.locationDist}
          />
        ))}
      </ChannelListContainer>
    </BaseGridPageComponent>
  );
};

const ChannelListContainer = styled.div`
  padding: 2rem 1rem 1rem 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export default ChannelList;

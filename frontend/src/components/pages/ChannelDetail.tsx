import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { currentChannelDetailRequest } from "@/api/channelFetcher";

const ChannelDetail = () => {
  const { channelUuid } = useParams();
  const [channelDetail, setChannelDetail] = useState("");

  useEffect(() => {
    (async () => {
      const res = await currentChannelDetailRequest(
        `/api/channels/${channelUuid}/info`
      );
      console.log(res);
      setChannelDetail(res);
    })();
  }, []);
  return (
    <BasePageComponent>
      <ChannelDetailContainer>
        <ChannelDetailHeader>
          <ChannelTitle>여기어때</ChannelTitle>
          <ChannelInfo></ChannelInfo>
        </ChannelDetailHeader>
        <ChannelDetailBody>
          <ChannelDescription></ChannelDescription>
        </ChannelDetailBody>
        <ChannelDetailButtonContainer></ChannelDetailButtonContainer>
      </ChannelDetailContainer>
    </BasePageComponent>
  );
};

const ChannelDetailContainer = styled.div``;
const ChannelDetailHeader = styled.div``;
const ChannelTitle = styled.div``;
const ChannelInfo = styled.div``;
const ChannelDescription = styled.div``;
const ChannelDetailBody = styled.div``;
const ChannelDetailButtonContainer = styled.div``;

export default ChannelDetail;

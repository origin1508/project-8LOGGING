import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { currentChannelDetailRequest } from "@/api/channelFetcher";
import GlobalTheme from "@/styles/theme";
import ChannelInfo from "@/components/channelDetail/ChannelInfo";
import ChannelReply from "@/components/channelDetail/ChannelReply";

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
        <ChannelInfo />
        <ChannelReply />
        <ChannelDetailButtonContainer>
          <Button>참가 신청</Button>
          <BackButton>목록으로</BackButton>
        </ChannelDetailButtonContainer>
      </ChannelDetailContainer>
    </BasePageComponent>
  );
};

const ChannelDetailContainer = styled.div`
  width: 120rem;
  height: 85rem;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-radius: 4px;
`;

const ChannelDetailButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  width: 100%;
`;

const Button = styled.button`
  ${GlobalTheme.buttons}
  width: 30rem;
  height: 4rem;
  background-color: ${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  font-size: ${GlobalTheme.fontSize.littleBig};
  cursor: pointer;
`;

const BackButton = styled(Button)`
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  border: 1px solid ${GlobalTheme.colors.theme};
`;

export default ChannelDetail;

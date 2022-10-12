import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { currentChannelDetailRequest } from "@/api/channelFetcher";
import GlobalTheme from "@/styles/theme";
import ChannelInfo from "@/components/channelDetail/ChannelInfo";
import { ChannelDetailType } from "@/types/channel/channelTypes";

const ChannelDetail = () => {
  const navigate = useNavigate();
  const { channelUuid } = useParams();
  const [channelDetailInfo, setChannelDetailInfo] = useState<
    ChannelDetailType[]
  >([]);

  useEffect(() => {
    (async () => {
      const res = await currentChannelDetailRequest(
        `/api/channels/${channelUuid}`
      );
      setChannelDetailInfo([res.datas]);
    })();
  }, []);
  return (
    <BasePageComponent>
      <ChannelDetailContainer>
        {channelDetailInfo.map((info) => (
          <ChannelInfo
            key={info._id}
            title={info.title}
            spec={info.spec}
            imgUrl={info.imgUrl}
            locationCity={info.locationCity}
            locationDist={info.locationDist}
            memberNum={info.memberNum}
            ownerInfo={info.ownerInfo}
            membersInfo={info.membersInfo}
          />
        ))}

        <ChannelDetailButtonContainer>
          <Button>참가 신청</Button>
          <BackButton onClick={() => navigate(-1)}>목록으로</BackButton>
        </ChannelDetailButtonContainer>
      </ChannelDetailContainer>
    </BasePageComponent>
  );
};

const ChannelDetailContainer = styled.div`
  width: 90rem;
  height: 60rem;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-radius: 8px;
  margin-right: 2rem;
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

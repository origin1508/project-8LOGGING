import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelInfo from "@/components/channelDetail/ChannelInfo";
import { ChannelDetailType } from "@/types/channel/channelTypes";

interface Props {
  isShowMore: boolean;
  setIsShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  channelDetailInfo: ChannelDetailType[];
}

const ChannelDetail = ({
  isShowMore,
  setIsShowMore,
  channelDetailInfo,
}: Props) => {
  return (
    <ChannelDetailBackground isShowMore={isShowMore}>
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
          <Button>참가하기</Button>
          <BackButton
            onClick={() => {
              setIsShowMore(false);
            }}
          >
            Close
          </BackButton>
        </ChannelDetailButtonContainer>
      </ChannelDetailContainer>
    </ChannelDetailBackground>
  );
};

const ChannelDetailBackground = styled.div<{ isShowMore: boolean }>`
  display: ${(props) => (props.isShowMore ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ChannelDetailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100rem;
  height: 60rem;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-radius: 8px;
`;

const ChannelDetailButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8rem;
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

import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";
import { ChannelDetailType } from "@/types/channel/channelTypes";

const ChannelInfo = ({
  title,
  spec,
  imgUrl,
  locationCity,
  locationDist,
  memberNum,
  ownerInfo,
}: ChannelDetailType) => {
  console.log(spec);
  return (
    <ChannelInfoContainer>
      <InfoHeaderContainer>
        <MainInfoContainer>
          <ChannelTitle>{title}</ChannelTitle>
          <MemberNumInfo>
            <CustomIcon
              name="people"
              size="15"
              color={GlobalTheme.colors.theme}
            />
            <Text>{memberNum}</Text>
          </MemberNumInfo>
          <LocationInfo>
            <CustomIcon name="map" size="15" color={GlobalTheme.colors.theme} />
            <Text>
              {locationDist} {locationCity}
            </Text>
          </LocationInfo>
        </MainInfoContainer>
        <OwnerInfoContainer>
          <OwnerPic>
            <Img src={ownerInfo.ownerPic} />
          </OwnerPic>
          <OwnerNickname>{ownerInfo.ownerNickname}</OwnerNickname>
        </OwnerInfoContainer>
      </InfoHeaderContainer>
      <InfoBodyContainer>
        <ChannelDescription>{spec}</ChannelDescription>
        <ChannelPic>
          <Img src={imgUrl} />
        </ChannelPic>
      </InfoBodyContainer>
    </ChannelInfoContainer>
  );
};

const ChannelInfoContainer = styled.div`
  margin: 5rem;
`;

const InfoHeaderContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  position: relative;
`;

const MainInfoContainer = styled.div``;

const ChannelTitle = styled.div`
  width: 70%;
  margin-bottom: 1rem;
  font-size: ${GlobalTheme.fontSize.hyperBig};
`;

const MemberNumInfo = styled.span``;
const LocationInfo = styled.span``;

const Text = styled.span`
  font-size: ${GlobalTheme.fontSize.littleBig};
  margin: 1rem;
`;

const OwnerInfoContainer = styled.div`
  position: absolute;
  left: 70%;
  top: 0;
  display: flex;
  align-items: center;
`;

const OwnerPic = styled.div`
  width: 8rem;
  height: 8rem;
  border: 1px solid black;
  overflow: hidden;
  border-radius: 70%;
`;

const OwnerNickname = styled.div`
  width: 20rem;
  margin-left: 1rem;
  font-size: ${GlobalTheme.fontSize.moreBig};
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    word-wrap: break-word;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoBodyContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const ChannelDescription = styled.div`
  width: 50rem;
  height: 25rem;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-radius: 4px;
  box-sizing: border-box;
  padding: 3rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  white-space: pre-wrap;
`;

const ChannelPic = styled.div`
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  width: 50rem;
  height: 25rem;
  overflow: hidden;
`;

export default ChannelInfo;

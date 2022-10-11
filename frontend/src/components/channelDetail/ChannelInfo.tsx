import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";

const ChannelInfo = () => {
  return (
    <ChannelInfoContainer>
      <InfoHeaderContainer>
        <MainInfoContainer>
          <ChannelTitle>여기어때 저기어때</ChannelTitle>
          <MemberNumInfo>
            <CustomIcon
              name="people"
              size="15"
              color={GlobalTheme.colors.theme}
            />
            <Text>12</Text>
          </MemberNumInfo>
          <LocationInfo>
            <CustomIcon name="map" size="15" color={GlobalTheme.colors.theme} />
            <Text>서울시 마포구</Text>
          </LocationInfo>
        </MainInfoContainer>
        <OwnerInfoContainer>
          <OwnerPic>
            <Img />
          </OwnerPic>
          <OwnerNickname>Alex</OwnerNickname>
        </OwnerInfoContainer>
      </InfoHeaderContainer>
      <InfoBodyContainer>
        <ChannelDescription>올여름 혼자어때 둘이어때</ChannelDescription>
        <ChannelPic></ChannelPic>
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
  left: 75%;
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

const Img = styled.img``;

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
  padding: 5rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

const ChannelPic = styled.div`
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  width: 50rem;
  height: 25rem;
`;

export default ChannelInfo;

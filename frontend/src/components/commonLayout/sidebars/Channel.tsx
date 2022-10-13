import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { channelsState } from "@/recoil/atoms/channelState";
import { loginUserIdState } from "@/recoil/atoms/authState";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";
import Storage from "@/storage/storage";
import * as Api from "@/api/api";

interface ChannelContainerProps {
  isToggle: boolean;
}

interface ItemType {
  _id: string;
  title: string;
}

const Channel: React.FC = () => {
  const loginUserId = useRecoilValue(loginUserIdState);
  const [channels, setChannels] = useRecoilState(channelsState);

  useEffect(() => {
    (async () => {
      if (Storage.getToken()) {
        const res = await Api.get(`/api/users/userinfo/${loginUserId}`);
        const chArray = res.data.datas.channels.map((item: ItemType) => {
          return { _id: item._id, title: item.title };
        });
        setChannels(chArray);
      }
    })();
  }, [Storage.getToken()]);

  const [isToggle, setIsToggle] = useState(false);
  return (
    <ChannelsContainer>
      <TitleContainer>
        <ChannelTitle>Channel</ChannelTitle>
        <ToggleIcon onClick={() => setIsToggle(!isToggle)}>
          {!isToggle ? (
            <CustomIcon
              name="toggleDown"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          ) : (
            <CustomIcon
              name="toggleUp"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          )}
        </ToggleIcon>
      </TitleContainer>

      <ChannelContainer isToggle={!isToggle}>
        {channels.map((channel, index) => {
          return <ChannelLink key={index}>{channel.title}</ChannelLink>;
        })}
      </ChannelContainer>
    </ChannelsContainer>
  );
};

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${GlobalTheme.fontSize.default}
  magin-top: 20rem;
`;

const ChannelLink = styled.a`
  text-decoration: none;
  margin-bottom: 3rem;
  color: ${GlobalTheme.colors.gray};
`;

const ChannelTitle = styled.div`
  width: 100%;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-weight: bold;
  text-align: left;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;
const ChannelContainer = styled.div<ChannelContainerProps>`
  display: flex;
  overflow: auto;

  ${(props) =>
    props.isToggle
      ? `visibility: hidden;
  height: 0vh;`
      : `visibility: visible;
  height: 20vh;`}
  flex-direction: column;
  transition: all 0.4s;
  &:active {
    transform: translateY(-0.1rem);
  }
`;
const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    scale: 1.2;
  }
`;

export default Channel;

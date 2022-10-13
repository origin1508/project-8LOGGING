import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import BaseCardContainerStyle from "@/components/hoc/BaseCardContainer";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import GlobalTheme from "@/styles/theme";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelSendButton from "@/components/channel/ChannelSendButton";
import { TextOne, TextTwo } from "@/styles/commonStyle";

function Channel() {
  const [channelContent, setChannelContent] = useState<string>("");

  // const socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`);

  useEffect(() => {
    // socket.emit("enter", "안녕하세요?");
  }, []);

  const handleChannelContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChannelContent(e.target.value);
    },
    [setChannelContent]
  );

  const handleChannelSendButtonClick = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(channelContent);
  }, []);

  return (
    <BasePageComponent>
      <BaseCardContainerStyle width="100rem">
        <ChannelHeader />
        <ChatForm>
          <ContentContainer>
            <UserContainer>
              <UserImg itemProp="https://cdn.imweb.me/upload/S20211110a3d216dc49446/f7bfffacbb6de.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
          </ContentContainer>
          <ChatInput onChange={handleChannelContentChange} />
          <ChannelSendButton
            onChannelSendButtonEvent={handleChannelSendButtonClick}
          />
        </ChatForm>
      </BaseCardContainerStyle>
    </BasePageComponent>
  );
}

const ChatForm = styled.form`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const ChatInput = styled.input`
  position: absolute;
  bottom: 2rem;
  padding: 0rem 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  width: 90%;
  height: 13%;
  border-radius: 2rem;
  border: 1.2px solid ${GlobalTheme.colors.theme};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 80%;
  padding: 1rem 0rem 0rem 3rem;
  overflow-y: scroll;
`;

const UserContainer = styled.div`
  margin-botton: 2rem;
  display: flex;
  width: 70%;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
`;

const UserImg = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-image: url(${(props) => props.itemProp});
  background-size: cover;
  border-radius: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Channel;

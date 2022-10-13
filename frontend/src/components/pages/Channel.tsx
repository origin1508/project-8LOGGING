import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { TextOne, TextTwo } from "@/styles/commonStyle";
import socketIOClient from "socket.io-client";
import BaseCardContainerStyle from "@/components/hoc/BaseCardContainer";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelSendButton from "@/components/channel/ChannelSendButton";
import {
  channelMessageRequest,
  channelChatLogRequest,
} from "@/api/channelFetcher";
import {
  ChannelLogObjectType,
  ChannelLogType,
} from "@/types/channel/channelTypes";

function Channel() {
  const [channelContent, setChannelContent] = useState<string>("");
  const [chatLogs, setChatLogs] = useState<Array<ChannelLogType>>([]);

  const { channelId } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const socket = socketIOClient(
    `${process.env.REACT_APP_SERVER_BASE_URL}/chat`,
    { path: "/chat-socket", transports: ["websocket"] }
  );

  useEffect(() => {
    socket.emit("enter", {
      roomId: channelId,
    });
    (async () => {
      const { datas } = await channelChatLogRequest(
        `/api/chat/log/${channelId}`
      );
      const { chatLogs, userInfo } = datas;
      setChatLogs(
        chatLogs.map((ch: ChannelLogObjectType, i: number) => {
          const obj = {
            _id: ch._id,
            createdAt: ch.createdAt,
            roomId: ch.roomId,
            userId: ch.userId,
            chat: ch.chat,
            nickname: userInfo[i].nickname,
            profPic: userInfo[i].profPic,
          };
          return obj;
        })
      );
    })();
  }, []);

  const handleChannelContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChannelContent(e.target.value);
    },
    [channelContent, setChannelContent]
  );

  const handleChannelSendButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelId) {
      await channelMessageRequest("/api/chat/log", channelId, channelContent);
      const { datas } = await channelChatLogRequest(
        `/api/chat/log/${channelId}`
      );
      const { chatLogs, userInfo } = datas;
      setChatLogs(
        chatLogs.map((ch: ChannelLogObjectType, i: number) => {
          const obj = {
            _id: ch._id,
            createdAt: ch.createdAt,
            roomId: ch.roomId,
            userId: ch.userId,
            chat: ch.chat,
            nickname: userInfo[i].nickname,
            profPic: userInfo[i].profPic,
          };
          return obj;
        })
      );
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <BasePageComponent>
      <BaseCardContainerStyle width="100rem">
        <ChannelHeader />
        <ChatForm>
          <ContentContainer>
            {chatLogs.map((chat) => (
              <UserContainer key={chat._id}>
                <UserImg itemProp={chat.profPic} />
                <UserInfo>
                  <TextOne>{chat.nickname}</TextOne>
                  <TextTwo>{chat.chat}</TextTwo>
                </UserInfo>
              </UserContainer>
            ))}
          </ContentContainer>
          <ChatInput ref={inputRef} onChange={handleChannelContentChange} />
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
  height: 40rem;
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

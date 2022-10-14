import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextMenu } from "react-contexify";
import styled from "styled-components";
import { loginUserIdState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import socketIOClient from "socket.io-client";
import { currentChannelDetailRequest } from "@/api/channelFetcher";
import { MainChannelType } from "@/types/channel/channelTypes";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal/Modal";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import GlobalTheme from "@/styles/theme";
import ChannelHeader from "@/components/channel/ChannelHeader";
import MemberList from "@/components/channel/MemberList";
import ChannelSendButton from "@/components/channel/ChannelSendButton";
import ContextMenu from "@/components/contextMenu/ContextMenu";
import { TextOne, TextTwo } from "@/styles/commonStyle";
import {
  channelMessageRequest,
  channelChatLogRequest,
} from "@/api/channelFetcher";
import {
  ChannelLogObjectType,
  ChannelLogType,
} from "@/types/channel/channelTypes";

const socket = socketIOClient(`${process.env.REACT_APP_SERVER_BASE_URL}/chat`, {
  path: "/chat-socket",
  transports: ["websocket"],
});

const CONTEXT_MENU_ID = "CONTEXT_MENU_ID";

function Channel() {
  const [channelContent, setChannelContent] = useState<string>("");
  const [chatLogs, setChatLogs] = useState<Array<ChannelLogType>>([]);
  const [channelData, setChannelData] = useState<MainChannelType[]>([]);
  const [entryFailureMessage, setEntryFailureMessage] = useState();
  const [isShowWaitList, setIsShowWaitList] = useState(false);
  const { channelId } = useParams();
  const loginUserId = useRecoilValue(loginUserIdState);
  const navigate = useNavigate();
  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { show } = useContextMenu({
    id: CONTEXT_MENU_ID,
  });

  const menuItems = ["답장하기", "수정하기", "삭제하기"];

  useEffect(() => {
    socket.emit("enter", {
      roomId: channelId,
    });
    (async () => {
      const res = await currentChannelDetailRequest(
        `/api/channels/${channelId}/main`
      );
      if (res.success) {
        setChannelData([res.datas]);
      } else {
        setChannelData([]);
        handleModalOpenButtonClick();
        setEntryFailureMessage(res.message);
      }

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
    // 이게 맞나..?
    // will unmount에서 이러한 작업을 수행해도 되는건가..?
    return () => {
      socket.on("chat", (data) => {
        setChatLogs((prev) => {
          return [
            ...prev,
            {
              _id: data._id,
              createdAt: data.createdAt,
              roomId: data.roomId,
              userId: data.userId,
              chat: data.chat,
              nickname: "foxmon",
              profPic:
                "https://elice-8seconds.s3.ap-northeast-2.amazonaws.com/1665109688589_image_1648301949725_750.jpeg",
            },
          ];
        });
      });
    };
  }, [channelId]);

  const handleChannelContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChannelContent(e.target.value);
    },
    [channelContent, setChannelContent]
  );

  const handleChannelSendButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelId)
      await channelMessageRequest("/api/chat/log", channelId, channelContent);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <BasePageComponent>
      {channelData &&
        channelData.map((data) => {
          const isOwner = data.ownerInfo.ownerId === loginUserId ? true : false;
          return (
            <React.Fragment key={data._id}>
              <ChannelContainer>
                <ChannelHeader
                  title={data.title}
                  memberNums={data.membersInfo.length}
                />
                <ChatForm>
                  <ContentContainer>
                    {chatLogs.map((chat) => (
                      <UserContainer key={chat._id}>
                        <UserImg itemProp={chat.profPic} />
                        <UserInfo onContextMenu={show}>
                          <TextOne>{chat.nickname}</TextOne>
                          <TextTwo>{chat.chat}</TextTwo>
                        </UserInfo>
                      </UserContainer>
                    ))}
                  </ContentContainer>
                  <ChatInput
                    ref={inputRef}
                    placeholder={"메시지 입력"}
                    onChange={handleChannelContentChange}
                  />
                  <ChannelSendButton
                    onChannelSendButtonEvent={handleChannelSendButtonClick}
                  />
                </ChatForm>
              </ChannelContainer>
              <MemberList
                channelMemberList={data.membersInfo}
                waitMemberList={data.waitList}
                isOwner={isOwner}
                isShowWaitList={isShowWaitList}
                setIsShowWaitList={setIsShowWaitList}
              />
            </React.Fragment>
          );
        })}
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={() => {
          handleModalCloseButtonClick;
          navigate("/profile", { replace: true });
        }}
      >
        {entryFailureMessage}
      </Modal>
      <ContextMenu items={menuItems} />
    </BasePageComponent>
  );
}

const ChannelContainer = styled.div`
  overflow: hidden;
  width: 70%;
  height: 90%;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ChatForm = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
`;

const ChatInput = styled.input`
  position: absolute;
  bottom: 2%;
  padding: 0rem 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  width: 90%;
  height: 4rem;
  margin-top: 2rem;
  border-radius: 3rem;
  border: 1.2px solid ${GlobalTheme.colors.theme};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
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

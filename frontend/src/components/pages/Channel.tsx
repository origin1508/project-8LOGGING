import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { currentChannelDetailRequest } from "@/api/channelFetcher";
import { MainChannelType } from "@/types/channel/channelTypes";
import Modal from "@/components/modal/Modal";
import useModal from "@/hooks/useModal";
import styled from "styled-components";
import BaseCardContainerStyle from "../hoc/BaseCardContainer";
import BasePageComponent from "../hoc/BasePageComponent";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "../icons/CustomIcon";
import {
  BigTitle,
  TextOne,
  TextTwo,
  MediumSubTitle,
  MediumTitle,
} from "@/styles/commonStyle";

function Channel() {
  const [channelData, setChannelData] = useState<MainChannelType>();
  const [entryFailureMessage, setEntryFailureMessage] = useState();
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);
  useEffect(() => {
    (async () => {
      const res = await currentChannelDetailRequest(
        `/api/channels/${channelId}/main`
      );
      if (res.success) {
        setChannelData(res.datas);
      } else {
        setChannelData(undefined);
        handleModalOpenButtonClick();
        setEntryFailureMessage(res.message);
      }
    })();
  }, [channelId]);
  return (
    <BasePageComponent>
      <BaseCardContainerStyle width="100rem">
        {channelData && (
          <TitleContainer>
            <BigTitle>Channel</BigTitle>
            <MediumTitle>{channelData.title}</MediumTitle>
            <MediumSubTitle>
              <PeopleContainer>
                <CustomIcon
                  name="following"
                  size="20"
                  color={GlobalTheme.colors.gray}
                />
                {channelData.membersInfo.length}
              </PeopleContainer>
              <Application>new applicant 15</Application>
            </MediumSubTitle>
            <NewPeopleContainer>
              <IconBox>
                <CustomIcon
                  name="bell"
                  size="30"
                  color={GlobalTheme.colors.theme}
                ></CustomIcon>
                <Notification>{channelData.waitList?.length}</Notification>
              </IconBox>

              <NewPeople>New People</NewPeople>
            </NewPeopleContainer>
          </TitleContainer>
        )}

        {/* <ChatForm>
          <ContentContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
            <UserContainer>
              <UserImg itemProp="logo192.png"></UserImg>
              <UserInfo>
                <TextOne>들자구 </TextOne>
                <TextTwo>ㅁㄴㅇㅁㄴㅇ</TextTwo>
              </UserInfo>
            </UserContainer>
          </ContentContainer>
          <ChatInput />
          <SendButton>
            <CustomIcon
              name="send"
              size="22"
              color={GlobalTheme.colors.theme}
            />
          </SendButton>
        </ChatForm> */}
      </BaseCardContainerStyle>
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
    </BasePageComponent>
  );
}

const TitleContainer = styled.div`
  position: relative;
  padding: 2rem;
  height: 20%;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 1rem;
  }
`;

const PeopleContainer = styled.div`
  display: flex;
  padding-right: 1rem;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid ${GlobalTheme.colors.gray};
`;

const Application = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const IconBox = styled.div`
  position: relative;
`;
const Notification = styled.span`
  font-size: 0.8rem;
  height: 1.75rem;
  width: 1.75rem;
  background-color: #eb2f64;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 1.2rem;
  right: -0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewPeopleContainer = styled.div`
  position: absolute;
  top: 4rem;
  cursor: pointer;
  right: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;
const NewPeople = styled.div`
  font-weight: bold;
  line-height: 1.4;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

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

const SendButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  bottom: 8%;
  right: 8%;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
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

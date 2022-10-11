import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import useModal from "@/hooks/useModal";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import ChannelEnter from "@/components/recruitingChannel/ChannelEnter";
import Modal from "@/components/modal/Modal";
import { BigTitle, BigButton } from "@/styles/commonStyle";
import { ChannelsType, ChannelOwnerType } from "@/types/channel/channelTypes";
import { getAuthInformationById } from "@/api/authFetcher";
import {
  currentChannelListRequest,
  channelEnterRequest,
} from "@/api/channelFetcher";

const ChannelList = () => {
  const [channels, setChannels] = useState<Array<ChannelsType>>([]);
  const [onwerInfo, setOwerInfo] = useState<ChannelOwnerType>({
    _id: "",
    email: "",
    nickname: "nickname",
    description: "",
    profPic: "profPic",
  });
  const [selectedChannelId, setSelectedChannelId] = useState<string>();

  const [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    // api/channels?page=1&status=0
    (async () => {
      const { datas } = await currentChannelListRequest(
        "/api/channels?page=1&status=0"
      );
      setChannels(datas);
    })();
  }, []);

  const handleCreateChannelClick = () => {
    navigate("/channels/create");
  };

  const handleChannelEnterClick = (id: string, ownerId: string) => async () => {
    const owner = await getAuthInformationById("/api/users/userinfo", ownerId);
    const { _id, email, nickname, description, profPic } = owner;
    setOwerInfo({
      _id: _id,
      email: email,
      nickname: nickname,
      description: description,
      profPic: profPic,
    });
    setSelectedChannelId(id);
    handleModalOpenButtonClick();
  };

  const handleChannelEnterDecideClick = async () => {
    await channelEnterRequest(
      `/api/channels/${selectedChannelId}/enter`,
      "Change"
    );
    handleModalCloseButtonClick();
  };

  return (
    <BasePageComponent>
      <ChannelListContiner>
        <ChannelListForm>
          <TitleContainer>
            <BigTitle>Recruting Channel</BigTitle>
            <BigButton onClick={handleCreateChannelClick}>
              채널생성하기
            </BigButton>
          </TitleContainer>
          <CardsContainer>
            {channels.map((ch) => (
              <ChannelCard
                key={ch._id}
                id={ch._id}
                ownerId={ch.ownerId}
                img={ch.img}
                title={ch.title}
                curMemberNum={ch.curMemberNum}
                locationDist={ch.locationDist}
                locationCity={ch.locationCity}
                onChannelEnterClick={handleChannelEnterClick}
              />
            ))}
          </CardsContainer>
        </ChannelListForm>
      </ChannelListContiner>
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        <ChannelEnter
          email={onwerInfo?.email}
          nickname={onwerInfo?.nickname}
          description={onwerInfo?.description}
          profPic={onwerInfo?.profPic}
          onEnterDecideClickEvent={handleChannelEnterDecideClick}
        />
      </Modal>
    </BasePageComponent>
  );
};

const ChannelListContiner = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
`;
const CardsContainer = styled.div`
  padding-left: 7rem;
  overflow-y: scroll;
  display: flex;
  height: 80%;
  align-itmes: center;
  flex-wrap: wrap;
  gap: 5rem;
`;
const TitleContainer = styled.div`
  padding: 3rem 0rem;
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
const ChannelListForm = styled.div`
  width: 110rem;
  overflow: hidden;
  height: 80rem;
  border-radius: 1rem;
  background-color: ${GlobalTheme.colors.lightGray};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export default ChannelList;

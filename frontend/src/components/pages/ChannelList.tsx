import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import useModal from "@/hooks/useModal";
import usePagination from "@/hooks/usePagination";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import ChannelEnter from "@/components/recruitingChannel/ChannelEnter";
import ChannelDetail from "@/components/channelDetail/ChannelDetail";
import Modal from "@/components/modal/Modal";
import PaginateButton from "@/components/paginate/PaginateButton";
import { BigTitle, BigButton } from "@/styles/commonStyle";
import { ChannelsType, ChannelOwnerType } from "@/types/channel/channelTypes";
import { getAuthInformationById } from "@/api/authFetcher";
import {
  currentChannelListRequest,
  channelEnterRequest,
  currentChannelDetailRequest,
} from "@/api/channelFetcher";
import CustomIcon from "@/components/icons/CustomIcon";
import { ChannelDetailType } from "@/types/channel/channelTypes";

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
  const [isShowMore, setIsShowMore] = useState(false);
  const [channelDetailInfo, setChannelDetailInfo] = useState<
    ChannelDetailType[]
  >([]);

  const [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const {
    page,
    status,
    handleNextButtonClick,
    handlePrevButtonClick,
    handlePageButtonClick,
  } = usePagination({ page: 1, status: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    // api/channels?page=1&status=0
    (async () => {
      const { datas } = await currentChannelListRequest(
        `/api/channels?page=${page}&status=${status}`
      );
      setChannels(datas);
    })();
  }, [page]);

  const handleMoreClick = async (channelUuid: string) => {
    const res = await currentChannelDetailRequest(
      `/api/channels/${channelUuid}`
    );
    setChannelDetailInfo([res.datas]);
    setIsShowMore(true);
  };

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
          <Search>
            <SearchInput type="text" placeholder="Search"></SearchInput>
            <SearchButton>
              <CustomIcon name="SeachIcon" size="20" color="black"></CustomIcon>
            </SearchButton>
            <Select>
              <option value="All">All</option>
              <option value="Title">Title</option>
              <option value="Regin">Regin</option>
            </Select>
          </Search>

          <CardsContainer>
            {channels.map((ch) => (
              <ChannelCard
                key={ch._id}
                id={ch._id}
                ownerId={ch.ownerId}
                img={ch.img}
                title={ch.title}
                channelUuid={ch._id}
                curMemberNum={ch.curMemberNum}
                locationDist={ch.locationDist}
                locationCity={ch.locationCity}
                onChannelEnterClick={handleChannelEnterClick}
                onMoreClick={handleMoreClick}
              />
            ))}
          </CardsContainer>
          <PaginateButton
            page={page}
            onNextButtonClickEvent={handleNextButtonClick}
            onPrevButtonClickEvent={handlePrevButtonClick}
            onPageButtonClickEvent={handlePageButtonClick}
          />
          <ChannelDetail
            isShowMore={isShowMore}
            setIsShowMore={setIsShowMore}
            channelDetailInfo={channelDetailInfo}
          />
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
  width: 100%;
  justify-content: center;
  align-itmes: center;
`;
const CardsContainer = styled.div`
  margin-top: 2rem;
  padding: 4rem;
  overflow-y: scroll;
  display: flex;
  height: 80%;
  align-itmes: center;
  flex-wrap: wrap;
  gap: 3rem;
`;
const TitleContainer = styled.div`
  padding: 3rem 0rem;
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
const ChannelListForm = styled.div`
  position: relative;
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

const Search = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchInput = styled.input`
  font-family: inherit;
  font-size: ${GlobalTheme.fontSize.big};
  color: inherit;
  background-color: ${GlobalTheme.colors.lightTwoGray};
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 2rem;
  width: 50%;
  transition: all 0.2s;
  margin-right: -3.25rem; // 서치아이콘 인풋위에 올라감
  box-shadow: 0px 5px 6px -3px rgb(145 158 171 / 20%),
    0px 9px 12px 1px rgb(145 158 171 / 14%),
    0px 3px 16px 2px rgb(145 158 171 / 12%);
`;
const SearchButton = styled.button`
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
  }
`;
const Select = styled.select`
  font-size: ${GlobalTheme.fontSize.littleBig};
  background-color: ${GlobalTheme.colors.lightTwoGray};
  margin-left: 2rem;
  height: 4rem;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 2rem;
  box-shadow: 0px 5px 6px -3px rgb(145 158 171 / 20%),
    0px 9px 12px 1px rgb(145 158 171 / 14%),
    0px 3px 16px 2px rgb(145 158 171 / 12%);
  padding: 10px;
`;
export default ChannelList;

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import useModal from "@/hooks/useModal";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelCard from "@/components/recruitingChannel/ChannelCard";
import ChannelDetail from "@/components/channelDetail/ChannelDetail";
import Modal from "@/components/modal/Modal";
import PaginateButton from "@/components/paginate/PaginateButton";
import { BigTitle, BigButton } from "@/styles/commonStyle";
import { ChannelsType } from "@/types/channel/channelTypes";
import { ErrorType } from "@/types/error/errorType";
import {
  currentChannelListRequest,
  channelEnterRequest,
  currentChannelDetailRequest,
} from "@/api/channelFetcher";
import CustomIcon from "@/components/icons/CustomIcon";
import { ChannelDetailType } from "@/types/channel/channelTypes";
import Storage from "@/storage/storage";

const ChannelList = () => {
  const isLoggedIn = useMemo(() => {
    return Storage.getToken() ? true : false;
  }, [Storage.getToken()]);
  const setSidebarChannels = useSetRecoilState(sidebarChannelsState);

  const [channels, setChannels] = useState<Array<ChannelsType>>([]);
  const [resMessage, setResMessage] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isShowMore, setIsShowMore] = useState(false);
  const [channelDetailInfo, setChannelDetailInfo] = useState<
    ChannelDetailType[]
  >([]);
  const [page, setPage] = useState<number>(1);

  const status = 0;

  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    // api/channels?page=1&status=0
    (async () => {
      const { datas, totalPages } = await currentChannelListRequest(
        `/api/channels?page=${page}&status=${status}`
      );
      setTotalPages(totalPages);
      setChannels(datas);
    })();
  }, [page]);

  const handleMoreClick = async (channelUuid: string) => {
    if (!isLoggedIn) {
      setResMessage("로그인이 필요합니다.");
      handleModalOpenButtonClick();
      return;
    }
    const res = await currentChannelDetailRequest(
      `/api/channels/${channelUuid}`
    );
    setChannelDetailInfo([res.datas]);
    setSelectedChannelId(res.datas._id);
    setIsShowMore(true);
  };

  const handleCreateChannelClick = () => {
    navigate("/channels/create");
  };

  const handleChannelEnterDecideClick = async (
    selectedChannelId: string,
    channelTitle: string
  ) => {
    try {
      await channelEnterRequest(
        `/api/channels/${selectedChannelId}/enter`,
        "Change"
      );
      setSidebarChannels((prev) => {
        return [
          ...prev,
          {
            _id: selectedChannelId,
            title: channelTitle,
          },
        ];
      });
      setResMessage("참가신청이 완료되었습니다.");
    } catch (error) {
      const err = error as ErrorType;
      setResMessage(err.response.data.message);
    }
    handleModalOpenButtonClick();
  };

  return (
    <BasePageComponent>
      <ChannelListContiner>
        <ChannelListForm>
          <TitleContainer>
            <BigTitle>Recruiting Channel</BigTitle>
            {isLoggedIn && (
              <BigButton onClick={handleCreateChannelClick}>
                채널생성하기
              </BigButton>
            )}
          </TitleContainer>
          <Search>
            <SearchInput type="text" placeholder="Search"></SearchInput>
            <SearchButton>
              <CustomIcon name="SeachIcon" size="20" color="black"></CustomIcon>
            </SearchButton>
            <Select>
              <option value="All">All</option>
              <option value="Title">Title</option>
              <option value="Regin">Region</option>
            </Select>
          </Search>

          <CardsContainer>
            {channels.map((ch) => (
              <ChannelCard
                key={ch._id}
                img={ch.img}
                title={ch.title}
                channelUuid={ch._id}
                curMemberNum={`${ch.memberNum}/${ch.members.length}`}
                locationDist={ch.locationDist}
                locationCity={ch.locationCity}
                onMoreClick={handleMoreClick}
              />
            ))}
          </CardsContainer>
          <PaginateButton
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
          <ChannelDetail
            isShowMore={isShowMore}
            setIsShowMore={setIsShowMore}
            channelDetailInfo={channelDetailInfo}
            onEnterDecideClickEvent={handleChannelEnterDecideClick}
            selectedChannelId={selectedChannelId}
          />
        </ChannelListForm>
      </ChannelListContiner>
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        {resMessage}
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
  width: 80%;
  min-width: 105rem;
  min-height: 75rem;
  overflow: hidden;
  height: 80vh;
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

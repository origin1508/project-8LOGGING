import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "@/hooks/useModal";
import useChannelForm from "@/hooks/useChannelForm";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelFormCard from "@/components/recruitingChannel/ChannelFormCard";
import BaseChannelComponent from "@/components/hoc/BaseChannelComponent";
import Modal from "@/components/modal/Modal";
import ValidationUtil from "@/util/validationUtil";
import { createChannelRequest } from "@/api/channelFetcher";
import { imageResize } from "@/util/imageResizeUtil";
import { channelListData } from "@/components/recruitingChannel/channelListData";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import { useSetRecoilState } from "recoil";

const ChannelForm = () => {
  const [image, setImage] = useState<Blob>();
  const [selectedCity, setSelectedCity] = useState<string>("가평군");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    `${process.env.PUBLIC_URL}/images/preview-form-img.png`
  );
  const setSidebarChannels = useSetRecoilState(sidebarChannelsState);
  const [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const { channelForm, handleChannelFormValueChange } = useChannelForm({
    title: "",
    locationDist: "경기도",
    memberNum: 2,
    spec: "",
    image: "",
  });

  const navigate = useNavigate();

  const distOptions = Object.keys(channelListData).sort(
    (a: string, b: string) => (a < b ? -1 : 1)
  );

  const sortedChannelListData = distOptions.reduce((acc, cur: string) => {
    return {
      ...acc,
      [cur]: channelListData[cur].sort((a: string, b: string) =>
        a < b ? -1 : 1
      ),
    };
  }, {});

  const {
    checkChannelTitleValidate,
    checkChannelMemberCountValidate,
    checkChannelSpecValidate,
  } = ValidationUtil;

  const isValidTitle = checkChannelTitleValidate(channelForm.title);
  const isValidMemberCount = checkChannelMemberCountValidate(
    channelForm.memberNum
  );
  const isValidSpec = checkChannelSpecValidate(channelForm.spec);

  const isValid = [isValidTitle, isValidMemberCount, isValidSpec].every(
    (valid) => valid === true
  );

  const handleImageUploadClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const compress = await imageResize(file);
      setImage(compress);
      const preview = new FileReader();
      preview.readAsDataURL(compress);
      preview.onload = () => {
        setImagePreview(preview.result);
      };
    }
  };

  const hanldeSelecCityChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
      | string
  ) => {
    if (typeof e === "string") {
      setSelectedCity(e);
    } else {
      setSelectedCity(e.target.value);
    }
  };

  const handleChannelFormCreateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      handleModalOpenButtonClick();
      return;
    }
    const { title, locationDist, memberNum, spec } = channelForm;
    const { datas } = await createChannelRequest("/api/channels", {
      title,
      locationDist,
      selectedCity,
      memberNum,
      spec,
      image,
    });
    if (datas) {
      setSidebarChannels((prev) => {
        return [
          ...prev,
          {
            _id: datas._id,
            title: title,
            position: 0,
          },
        ];
      });
      navigate("/channels");
    }
  };

  return (
    <BaseChannelComponent>
      <ChannelContainer>
        <ChannelFormCard
          channelForm={channelForm}
          distOptions={distOptions}
          channelListData={sortedChannelListData}
          selectedCity={selectedCity}
          imagePreview={imagePreview}
          isValidTitle={isValidTitle}
          isValidMemberCount={isValidMemberCount}
          isValidSpec={isValidSpec}
          onChannelFormValueChangeEvent={handleChannelFormValueChange}
          onChannelImageUploadClickEvent={handleImageUploadClick}
          onChangeSelectChangeEvent={hanldeSelecCityChange}
          onChannelFormCreateClickEvent={handleChannelFormCreateClick}
        />
        <Modal
          isOpenModal={isOpenModal}
          isAlertModal={true}
          onModalCancelButtonClickEvent={handleModalCloseButtonClick}
        >
          Please check your channel information
        </Modal>
      </ChannelContainer>
    </BaseChannelComponent>
  );
};

const ChannelContainer = styled.div`
  width: 90%;

  background-color: ${GlobalTheme.colors.lightThreeGray};
  padding: 3rem;
`;

const ChannelFormWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ChannelForm;

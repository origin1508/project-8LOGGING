import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChannelForm from "@/hooks/useChannelForm";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelFormCard from "@/components/recruitingChannel/ChannelFormCard";
import BaseChannelComponent from "@/components/hoc/BaseChannelComponent";
import { createChannelRequest } from "@/api/channelFetcher";
import { imageResize } from "@/util/imageResizeUtil";
import { channelListData } from "@/components/recruitingChannel/channelListData";

const ChannelForm = () => {
  const [image, setImage] = useState<Blob>();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();

  const { channelForm, handleChannelFormValueChange } = useChannelForm({
    title: "",
    locationDist: "경기도",
    memberNum: 1,
    spec: "",
    image: "",
  });

  const navigate = useNavigate();

  const distOptions = Object.keys(channelListData);

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
  ) => {
    setSelectedCity(e.target.value);
  };

  const handleChannelFormCreateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, locationDist, memberNum, spec } = channelForm;
    const city = !selectedCity
      ? channelListData[channelForm.locationDist][0]
      : selectedCity;
    setSelectedCity(city);
    const { datas } = await createChannelRequest("/api/channels", {
      title,
      locationDist,
      selectedCity,
      memberNum,
      spec,
      image,
    });
    if (datas) navigate("/");
  };

  return (
    <BaseChannelComponent>
      <ChannelContainer>
        <ChannelFormCard
          channelForm={channelForm}
          distOptions={distOptions}
          channelListData={channelListData}
          selectedCity={selectedCity}
          imagePreview={imagePreview}
          onChannelFormValueChangeEvent={handleChannelFormValueChange}
          onChannelImageUploadClickEvent={handleImageUploadClick}
          onChangeSelectChangeEvent={hanldeSelecCityChange}
          onChannelFormCreateClickEvent={handleChannelFormCreateClick}
        />
      </ChannelContainer>
    </BaseChannelComponent>
  );
};

const ChannelContainer = styled.div`
  width: 100%;
  background-color: ${GlobalTheme.colors.lightThreeGray};
  padding: 3rem;
`;

export default ChannelForm;

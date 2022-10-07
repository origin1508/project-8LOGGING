import React, { useState } from "react";
import useChannelForm from "@/hooks/useChannelForm";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelFormCard from "@/components/recruitingChannel/ChannelFormCard";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import { createChannelRequest } from "@/api/channelFetcher";

const ChannelForm = () => {
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();

  const { channelForm, handleChannelFormValueChange } = useChannelForm({
    title: "",
    locationDist: "",
    locationCity: "",
    memberNum: 1,
    spec: "",
    image: "",
  });

  const distOptions = [
    "Gyeonggi",
    "Gangwon",
    "Chungcheong",
    "Jeolla",
    "Gyeongsang",
  ];

  const handleImageUploadClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // const imgFormData = new FormData();
      // imgFormData.append("image", file);
      setImage(file);
      const preview = new FileReader();
      preview.readAsDataURL(file);
      preview.onload = () => {
        setImagePreview(preview.result);
      };
    }
  };

  const handleChannelFormCreateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, locationDist, locationCity, memberNum, spec } = channelForm;
    const { datas } = await createChannelRequest("/api/channels", {
      title,
      locationDist,
      locationCity,
      memberNum,
      spec,
      image,
    });
    console.log(datas);
  };

  return (
    <BasePageComponent>
      <ChannelContainer>
        <ChannelFormCard
          channelForm={channelForm}
          distOptions={distOptions}
          imagePreview={imagePreview}
          onChannelFormValueChangeEvent={handleChannelFormValueChange}
          onChannelImageUploadClickEvent={handleImageUploadClick}
          onChannelFormCreateClickEvent={handleChannelFormCreateClick}
        />
      </ChannelContainer>
    </BasePageComponent>
  );
};

const ChannelContainer = styled.div`
  width: 100%;
  background-color: ${GlobalTheme.colors.lightThreeGray};
  padding: 3rem;
`;

export default ChannelForm;

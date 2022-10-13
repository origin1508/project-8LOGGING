import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "../hoc/BaseValidateTextContainer";

interface CardImageProp {
  backgroundImg?: string;
}

interface ChannelFormCardProps {
  channelForm: ChannelFormInitialType;
  distOptions: Array<string>;
  channelListData: { [key: string]: Array<string> };
  selectedCity: string;
  imagePreview: string | ArrayBuffer | FileReader | null | undefined;
  isValidTitle: boolean;
  isValidMemberCount: boolean;
  isValidSpec: boolean;
  onChannelFormValueChangeEvent: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onChannelImageUploadClickEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChangeSelectChangeEvent: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
      | string
  ) => void;
  onChannelFormCreateClickEvent: (e: React.FormEvent) => void;
}

const ChannelFormCard = ({
  channelForm,
  distOptions,
  channelListData,
  selectedCity,
  imagePreview,
  isValidTitle,
  isValidMemberCount,
  isValidSpec,
  onChannelFormValueChangeEvent,
  onChannelImageUploadClickEvent,
  onChangeSelectChangeEvent,
  onChannelFormCreateClickEvent,
}: ChannelFormCardProps) => {
  return (
    <ChannelFormWrapper>
      <ChannelHeaderWrapper>
        <ChannelTitle>CREATE CHANNEL</ChannelTitle>
        <ChannelButtonContainer>
          <ChannelButton type="submit" onClick={onChannelFormCreateClickEvent}>
            CREATE CHANNEL
          </ChannelButton>
          <ChannelImageLabel>Image upload</ChannelImageLabel>
          <ChannelImageUploadInput
            type="file"
            onChange={onChannelImageUploadClickEvent}
          />
        </ChannelButtonContainer>
      </ChannelHeaderWrapper>
      <ChannelWrapper>
        <ChannelInputWrapper>
          <ChannelLabel>Title</ChannelLabel>
          <BaseIntputContainer>
            <ChannelInput
              placeholder="Channel title"
              name="title"
              value={channelForm.title}
              onChange={onChannelFormValueChangeEvent}
            />
            {!isValidTitle && (
              <BaseValidateTextContainer>
                Please check your channel title
              </BaseValidateTextContainer>
            )}
          </BaseIntputContainer>
          <ChannelLabel>Member count</ChannelLabel>
          <BaseIntputContainer>
            <ChannelInput
              placeholder="Number of recruits"
              name="memberNum"
              type="number"
              min="2"
              max="25"
              value={channelForm.memberNum}
              onChange={onChannelFormValueChangeEvent}
            />
            {!isValidMemberCount && (
              <BaseValidateTextContainer>
                Please check your channel member count
              </BaseValidateTextContainer>
            )}
          </BaseIntputContainer>
          <ChannelLabel>Location</ChannelLabel>
          <BaseIntputContainer>
            <ChannelSelector
              name="locationDist"
              value={channelForm.locationDist}
              onChange={(e) => {
                onChannelFormValueChangeEvent(e);
                onChangeSelectChangeEvent(channelListData[e.target.value][0]);
              }}
            >
              {distOptions.map((dist) => (
                <ChannelOption key={dist}>{dist}</ChannelOption>
              ))}
            </ChannelSelector>
            <ChannelSelector
              value={selectedCity}
              onChange={onChangeSelectChangeEvent}
            >
              {channelListData[channelForm.locationDist].map((city) => (
                <ChannelOption key={city}>{city}</ChannelOption>
              ))}
            </ChannelSelector>
          </BaseIntputContainer>
        </ChannelInputWrapper>
        <ChannelImageBox backgroundImg={imagePreview as string} />
      </ChannelWrapper>
      <ChannelTextArea
        placeholder="Please enter your channel description"
        name="spec"
        value={channelForm.spec}
        onChange={onChannelFormValueChangeEvent}
      />
      {!isValidSpec && (
        <BaseValidateTextContainer>
          Please check your channel description
        </BaseValidateTextContainer>
      )}
    </ChannelFormWrapper>
  );
};

const ChannelFormWrapper = styled.form`
  width: 90%;

  margin: 0 auto;
  margin-top: 2rem;
  padding: 1.725rem;
  background-color: ${GlobalTheme.colors.white};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChannelTitle = styled.p`
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
  color: ${GlobalTheme.colors.black};
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const ChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChannelInputWrapper = styled.div`
  width: 50%;
`;

const ChannelImageUploadInput = styled.input`
  display: inline-block;
  padding: 1rem;
`;

const ChannelImageLabel = styled.label`
  display: inline-block;
`;

const ChannelLabel = styled.label`
  display: block;
  width: auto;
  padding-bottom: 1.25rem;
`;

const ChannelInput = styled.input`
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelSelector = styled.select`
  cursor: pointer;
  margin-right: 1rem;
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelOption = styled.option`
  padding: 0.875rem;
`;

const ChannelImageBox = styled.div<CardImageProp>`
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: block;
  width: 45%;
  height: 25rem;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelTextArea = styled.textarea`
  width: 98%;
  height: 25rem;
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelButtonContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "eBold";
`;

const ChannelButton = styled.button`
  ${GlobalTheme.buttons}
  width: 100%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  padding: 0.975rem;
  text-align: center;
  cursor: pointer;
`;

export default ChannelFormCard;

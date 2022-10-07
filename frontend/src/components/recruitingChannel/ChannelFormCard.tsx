import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";

interface ChannelFormCardProps {
  channelForm: ChannelFormInitialType;
  distOptions: Array<string>;
  imagePreview: string | ArrayBuffer | null | any;
  onChannelFormValueChangeEvent: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onChannelImageUploadClickEvent: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChannelFormCreateClickEvent: (e: React.FormEvent) => void;
}

const ChannelFormCard = ({
  channelForm,
  distOptions,
  imagePreview,
  onChannelFormValueChangeEvent,
  onChannelImageUploadClickEvent,
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
          <ChannelImageUploadInput
            type="file"
            onChange={onChannelImageUploadClickEvent}
          />
        </ChannelButtonContainer>
      </ChannelHeaderWrapper>
      <ChannelWrapper>
        <ChannelInputWrapper>
          <BaseIntputContainer>
            <ChannelInput
              placeholder="Channel title"
              name="title"
              value={channelForm.title}
              onChange={onChannelFormValueChangeEvent}
            />
          </BaseIntputContainer>
          <BaseIntputContainer>
            <ChannelInput
              placeholder="Number of recruits"
              name="memberNum"
              type="number"
              value={channelForm.memberNum}
              onChange={onChannelFormValueChangeEvent}
            />
          </BaseIntputContainer>
          <BaseIntputContainer>
            <ChannelInput
              placeholder="Location city"
              name="locationCity"
              value={channelForm.locationCity}
              onChange={onChannelFormValueChangeEvent}
            />
          </BaseIntputContainer>
          <BaseIntputContainer>
            <ChannelSelector
              placeholder="Location district"
              name="locationDist"
              value={channelForm.locationDist}
              onChange={onChannelFormValueChangeEvent}
            >
              {distOptions.map((dist) => (
                <ChannelOption key={dist}>{dist}</ChannelOption>
              ))}
            </ChannelSelector>
          </BaseIntputContainer>
        </ChannelInputWrapper>
        <ChannelImageBox>
          <ChannelImage src={imagePreview} />
        </ChannelImageBox>
      </ChannelWrapper>
      <ChannelTextArea
        placeholder="Please enter your channel description"
        name="spec"
        value={channelForm.spec}
        onChange={onChannelFormValueChangeEvent}
      />
    </ChannelFormWrapper>
  );
};

const ChannelFormWrapper = styled.form`
  margin: 0 auto;
  padding: 1.75rem;
  background-color: ${GlobalTheme.colors.white};
  border-radius: 4px;
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
`;

const ChannelInputWrapper = styled.div`
  width: 50%;
`;

const ChannelImageUploadInput = styled.input`
  display: block;
  padding: 1rem;
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
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelOption = styled.option`
  padding: 0.875rem;
`;

const ChannelImageBox = styled.div`
  cursor: pointer;
  display: block;
  width: 45%;
  height: 230px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelImage = styled.img`
  width: auto;
`;

const ChannelTextArea = styled.textarea`
  width: 98%;
  height: 360px;
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

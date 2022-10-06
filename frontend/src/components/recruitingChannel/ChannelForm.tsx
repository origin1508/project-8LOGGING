import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";

const ChannelForm = () => {
  return (
    <BasePageComponent>
      <ChannelContainer>
        <ChannelFormWrapper>
          <ChannelTitle>CREATE CHANNEL</ChannelTitle>
          <ChannelWrapper>
            <ChannelInputWrapper>
              <BaseIntputContainer>
                <ChannelInput placeholder="Channel title" />
              </BaseIntputContainer>
              <BaseIntputContainer>
                <ChannelInput placeholder="Number of recruits" />
              </BaseIntputContainer>
              <BaseIntputContainer>
                <ChannelInput placeholder="Location" />
              </BaseIntputContainer>
              <BaseIntputContainer>
                <ChannelInput placeholder="Date" />
              </BaseIntputContainer>
            </ChannelInputWrapper>
            <ChannelImageBox>Image upload preview</ChannelImageBox>
          </ChannelWrapper>
          <ChannelTextArea placeholder="Please enter your channel description" />
        </ChannelFormWrapper>
      </ChannelContainer>
    </BasePageComponent>
  );
};

const ChannelContainer = styled.div`
  width: 100%;
  background-color: ${GlobalTheme.colors.lightThreeGray};
  padding: 3rem;
`;

const ChannelFormWrapper = styled.form`
  margin: 0 auto;
  padding: 1.75rem;
  background-color: ${GlobalTheme.colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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

const ChannelInput = styled.input`
  padding: ${GlobalTheme.input.padding};
  border-radius: ${GlobalTheme.input.borderRadius};
  border: ${GlobalTheme.input.border};
  outline: ${GlobalTheme.input.outline};
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ChannelImageBox = styled.div`
  display: block;
  width: 45%;
  height: 230px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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

export default ChannelForm;

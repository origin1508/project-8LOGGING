import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BigTitle, MediumSubTitle, MediumTitle } from "@/styles/commonStyle";
import CustomIcon from "@/components/icons/CustomIcon";

const ChannelHeader = () => {
  return (
    <TitleContainer>
      <BigTitle>Channel</BigTitle>
      <MediumTitle>제주도에서 쓰레기 줍기</MediumTitle>
      <MediumSubTitle>
        <PeopleContainer>
          <CustomIcon
            name="following"
            size="20"
            color={GlobalTheme.colors.gray}
          />
          15
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
          <Notification>15</Notification>
        </IconBox>

        <NewPeople>New People</NewPeople>
      </NewPeopleContainer>
    </TitleContainer>
  );
};

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

const NewPeople = styled.div`
  font-weight: bold;
  line-height: 1.4;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

export default ChannelHeader;

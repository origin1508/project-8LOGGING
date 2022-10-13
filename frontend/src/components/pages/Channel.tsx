import React from "react";
import styled from "styled-components";
import BaseCardContainerStyle from "../hoc/BaseCardContainer";
import BasePageComponent from "../hoc/BasePageComponent";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "../icons/CustomIcon";
import {
  BigTitle,
  TextOne,
  TextTwo,
  MediumSubTitle,
  MediumTitle,
} from "@/styles/commonStyle";

function Channel() {
  return (
    <BasePageComponent>
      <BaseCardContainerStyle width="100rem">
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
            <CustomIcon
              name="bell"
              size="30"
              color={GlobalTheme.colors.theme}
            ></CustomIcon>
            <NewPeople>New People</NewPeople>
          </NewPeopleContainer>
        </TitleContainer>
      </BaseCardContainerStyle>
    </BasePageComponent>
  );
}

const TitleContainer = styled.div`
  position: relative;
  padding: 2rem;
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

const NewPeopleContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const NewPeople = styled.div`
  font-weight: bold;
  line-height: 1.4;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
export default Channel;

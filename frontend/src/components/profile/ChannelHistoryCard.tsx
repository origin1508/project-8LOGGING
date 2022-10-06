import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BsPeopleFill, BsMapFill, BsCalendarDateFill } from "react-icons/bs";
interface CardImgProps {
  bg: string;
}

function ChannelHistoryCard() {
  return (
    <CardContainer>
      <CardImg bg="cardImg1.png"></CardImg>
      <CardContent>
        <CardTitle>제주에서 플로깅</CardTitle>

        <CardInfoList>
          <List>
            <BsPeopleFill
              size="20"
              color={GlobalTheme.colors.theme}
            ></BsPeopleFill>
            <PeopleCount>12명</PeopleCount>
          </List>
          <List>
            <BsMapFill size="20" color={GlobalTheme.colors.theme}></BsMapFill>
            <Location>제주도</Location>
          </List>
          <List>
            <BsCalendarDateFill
              size="20"
              color={GlobalTheme.colors.theme}
            ></BsCalendarDateFill>
            <Date>22/10/22</Date>
          </List>
        </CardInfoList>
        <ButtonContainer>
          <Button>참가하기</Button>
          <Button>More</Button>
        </ButtonContainer>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 24rem;
  height: 24rem;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size: ${GlobalTheme.fontSize.small};
`;

const CardImg = styled.div<CardImgProps>`
  height: 50%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

const CardContent = styled.div`
  height: 50%;
  padding: 0.5rem 0.7rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CardTitle = styled.h3`
  font-family: ${GlobalTheme.fontStyle.regular};
`;
const CardInfoList = styled.ul`
  display: flex;
  justify-content: space-between;
`;
const List = styled.li`
  display: flex;
  margin-right: 1rem;
  span {
    margin-left: 1rem;
  }
`;

const PeopleCount = styled.span``;
const Location = styled.span``;
const Date = styled.span``;
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background:none;
  color: ${GlobalTheme.colors.theme};
  padding: 0.7rem 1.2rem;
  border: 0.1rem solid ${GlobalTheme.colors.theme};

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

export default ChannelHistoryCard;

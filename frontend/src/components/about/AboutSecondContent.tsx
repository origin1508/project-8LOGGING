import React, { useMemo } from "react";
import {
  TitleContainer,
  AboutTitle,
  TitleHighlight,
  AboutTitleContent,
  BoldStyle,
  TextOne,
  TextTwo,
} from "@/styles/commonAboutStyle";
import BarChart from "@/components/chart/BarChart";
import { ChartDataType } from "@/types/chart/chartDataType";
import { createAboutSecondContent } from "@/static/aboutPloggingData";

const AboutSecondContent = ({ labels, data }: ChartDataType) => {
  const content = useMemo(() => createAboutSecondContent(), []);

  return (
    <TitleContainer itemProp="center">
      <AboutTitle>
        Why <TitleHighlight>Plog</TitleHighlight>?
      </AboutTitle>
      <AboutTitleContent>
        <TextOne>
          {content[0]}
          <br />
          {content[1]}
        </TextOne>
        <BarChart
          dataName="연도별 쓰레기 무게 합산"
          labels={labels}
          datas={data}
        />
        <TextTwo itemProp="center">
          {content[2]}
          <br />
          <BoldStyle>{content[3]}</BoldStyle>
          {content[4]}
          <BoldStyle>{content[5]}</BoldStyle>
          <br />
          {content[6]}
          <br />
          {content[7]}
          <br />
          <BoldStyle>{content[8]}</BoldStyle>
        </TextTwo>
      </AboutTitleContent>
    </TitleContainer>
  );
};

export default AboutSecondContent;

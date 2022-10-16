import React, { useMemo } from "react";
import {
  TitleContainer,
  AboutTitleContent,
  BoldStyle,
  TextOne,
  TextTwo,
} from "@/styles/commonAboutStyle";
import MultiLineChart from "@/components/chart/MultiLineChart";
import { ChartDataType } from "@/types/chart/chartDataType";
import { createAboutThirdContent } from "@/static/aboutPloggingData";

const AboutThirdContent = ({ labels, data1, data2, data3 }: ChartDataType) => {
  const multiDatas = useMemo(
    () => [data1, data2, data3] as number[][],
    [data1, data2, data3]
  );
  const content = useMemo(() => createAboutThirdContent(), []);

  return (
    <TitleContainer itemProp="center">
      <AboutTitleContent>
        <TextOne>
          {content[0]}
          <br />
          {content[1]}
        </TextOne>
        <MultiLineChart
          dataName="플라스틱 배출"
          labels={labels}
          multiDatas={multiDatas}
        />
        <TextTwo itemProp="center">
          {content[2]}
          <BoldStyle>{content[3]}</BoldStyle>
          <br />
          {content[4]}
          <BoldStyle>{content[5]}</BoldStyle>
          {content[6]}
          <br />
          {content[7]}
          <br />
          <BoldStyle>{content[8]}</BoldStyle>
          <br />
          {content[9]}
          <br />
          {content[10]}
          <BoldStyle>{content[11]}</BoldStyle>
          {content[12]}
          <br />
          {content[13]}
        </TextTwo>
      </AboutTitleContent>
    </TitleContainer>
  );
};

export default AboutThirdContent;

import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import useChartData from "@/hooks/useChartData";
import BarChart from "@/components/chart/BarChart";
import MultiLineChart from "@/components/chart/MultiLineChart";

const AboutPlogging = () => {
  const dataNames = ["korea_sea_monitor", "microplastic", "trash_rot"];

  const [barChartInfo] = useChartData(dataNames[0], {
    labels: [],
    data: [],
  });

  const [multiLineChartInfo] = useChartData(dataNames[1], {
    labels: [],
    data1: [],
    data2: [],
    data3: [],
  });

  const { data1, data2, data3 } = multiLineChartInfo;
  const multiDatas = [data1, data2, data3] as number[][];

  return (
    <ChartContainer>
      <AboutWrapper>
        <AboutTitleContent>
          플로깅Plogging이란 조깅을 하면서 길가의 쓰레기를 수거하는, 체육활동과
          자연보호활동이 합쳐진 활동입니다. 2016년에 스웨덴에서 시작된 이
          활동은, 2019년에 2백만 명의 사람들이 매일 플로깅에 참여하는 것으로
          집계될 만큼 인기를 끌고 있습니다.
        </AboutTitleContent>
        <AboutImage src="/images/plogging-about-1.png" />
      </AboutWrapper>
      <BarChart
        dataName="해양 쓰레기"
        labels={barChartInfo?.labels}
        datas={barChartInfo?.data}
      />
      <MultiLineChart
        dataName="미세플라스틱"
        labels={multiLineChartInfo?.labels}
        multiDatas={multiDatas}
      />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  margin-left: 26rem;
`;

const AboutWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const AboutTitleContent = styled.div`
  font-size: ${GlobalTheme.fontSize.hyperBig};
`;

const AboutImage = styled.img`
  width: 50%;
`;

export default AboutPlogging;

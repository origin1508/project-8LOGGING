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
        <TitleContainer>
          <AboutTitle>What is “plogging”?</AboutTitle>
          <AboutTitleContent>
            플로깅Plogging이란 조깅을 하면서 길가의 쓰레기를 수거하는,
            체육활동과 자연보호활동이 합쳐진 활동입니다. 2016년에 스웨덴에서
            시작된 이 활동은, 2019년에 2백만 명의 사람들이 매일 플로깅에
            참여하는 것으로 집계될 만큼 인기를 끌고 있습니다.
          </AboutTitleContent>
        </TitleContainer>

        <AboutImage src="/images/plogging-about-1.png" />
      </AboutWrapper>
      <AboutWrapperColumn>
        <TitleContainer>
          <AboutTitle>Why plog?</AboutTitle>
          <AboutTitleContent>
            쓰레기가 휴지통이 아닌 바닥에 버려지는 대표적인 장소 중 하나는
            바닷가입니다. 해양 환경 공단의 해양쓰레기 모니터링 자료에 따르면,
            전국 60곳에서 발견된 해양쓰레기의 합산이 최근 5년간 매년 1톤이
            넘었습니다. 코로나로 인한 집합 금지가 된 2020년에 그 수치가
            감소하였다가, 집합 금지가 단계적으로 해제되며 다시 상승세를 보이고
            있습니다. 이 많은 쓰레기들이 그대로 바다로 흘러간다면 어떻게 될까요?
          </AboutTitleContent>
        </TitleContainer>

        <BarChart
          dataName="Korea Sea Monitor Bar"
          labels={barChartInfo?.labels}
          datas={barChartInfo?.data}
        />
      </AboutWrapperColumn>
      <AboutWrapper>
        <MultiLineChart
          dataName="Microplastic"
          labels={multiLineChartInfo?.labels}
          multiDatas={multiDatas}
        />
      </AboutWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  margin-left: 26rem;
`;

const AboutWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AboutWrapperColumn = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AboutTitleContent = styled.div`
  width: 80%;
  font-size: ${GlobalTheme.fontSize.big2};
`;

const AboutImage = styled.img`
  width: 40rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const AboutTitle = styled.div`
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-family: ${GlobalTheme.fontStyle.bold};
`;

export default AboutPlogging;

import React from "react";
import styled from "styled-components";
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
      <BarChart
        dataName="Korea Sea Monitor Bar"
        labels={barChartInfo?.labels}
        datas={barChartInfo?.data}
      />
      <MultiLineChart
        dataName="Microplastic"
        labels={multiLineChartInfo?.labels}
        multiDatas={multiDatas}
      />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  margin-left: 26rem;
`;

export default AboutPlogging;

import React from "react";
import { ChartProps } from "@/types/common/baseChartPropsType";
import { chartRegistry, chartOptions } from "@/util/chartOption";
import BaseChartContainer from "@/components/hoc/BaseChartContainer";
import { Line } from "react-chartjs-2";

chartRegistry();

const MultiLineChart = ({ dataName, labels, multiDatas }: ChartProps) => {
  const options = chartOptions("Korea sea microplastic");
  const datasetLabel = [
    "플라스틱 배출 속도 2050년까지 증가",
    "플라스틱 배출 속도 2020년 수준 유지",
    "플라스틱 배출 2020년에 중지",
  ];
  const borderColor = ["#FA7070", "#2192FF", "#7DCE13"];

  const dataForChartRender = () => {
    const data: {
      labels: string[];
      datasets: Array<{
        label: string;
        data: Array<number>;
        borderColor: string;
        backgroundColor: string;
      }>;
    } = {
      labels: labels,
      datasets: [],
    };
    multiDatas?.forEach((d, i) => {
      data.datasets.push({
        label: `${dataName} ${datasetLabel[i]}`,
        data: d,
        borderColor: borderColor[i],
        backgroundColor: borderColor[i],
      });
    });
    return data;
  };

  return (
    <BaseChartContainer>
      <Line options={options} data={dataForChartRender()} />
    </BaseChartContainer>
  );
};

export default MultiLineChart;

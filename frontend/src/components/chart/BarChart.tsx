import React from "react";
import { ChartProps } from "@/types/common/baseChartPropsType";
import { chartRegistry, chartOptions } from "@/util/chartOption";
import BaseChartContainer from "@/components/hoc/BaseChartContainer";
import { Bar } from "react-chartjs-2";

chartRegistry();

const BarChart = ({ dataName, labels, datas }: ChartProps) => {
  const options = chartOptions("Korea sea monitor");

  const dataForChartRender = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: dataName,
          data: datas,
          backgroundColor: "#94B49F",
        },
      ],
    };
  };

  return (
    <BaseChartContainer>
      <Bar options={options} data={dataForChartRender()} />
    </BaseChartContainer>
  );
};

export default BarChart;

import React from "react";
import useChartData from "@/hooks/useChartData";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import BarChart from "@/components/chart/BarChart";

const AboutPlogging = () => {
  const dataNames = ["korea_sea_monitor", "microplastic", "trash_rot"];

  const [barChartInfo] = useChartData(dataNames[0], {
    labels: [],
    data: [],
  });

  return (
    <BasePageComponent>
      <BarChart
        dataName="Korea Sea Monitor Bar"
        labels={barChartInfo?.labels}
        datas={barChartInfo?.data}
      />
    </BasePageComponent>
  );
};

export default AboutPlogging;

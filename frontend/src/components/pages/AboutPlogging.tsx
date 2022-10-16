import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useScroll from "@/hooks/useScroll";
import useChartData from "@/hooks/useChartData";
import Dots from "@/styles/Dots";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import AboutWrapperComponent from "@/components/about/AboutWrapperComponent";
import AboutFirstContent from "@/components/about/AboutFirstContent";
import AboutSecondContent from "@/components/about/AboutSecondContent";
import AboutThirdContent from "@/components/about/AboutThirdContent";
import AboutFourthContent from "@/components/about/AboutFourthContent";

// const DIVIDER_HEIGHT = 5;

const AboutPlogging = () => {
  const dataNames = ["korea_sea_monitor", "microplastic", "trash_rot"];
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex] = useScroll(1, outerDivRef);
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

  return (
    <BasePageComponent>
      <Outer ref={outerDivRef}>
        <Dots scrollIndex={scrollIndex} />
        <AboutWrapperComponent>
          <AboutFirstContent />
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          <AboutSecondContent
            labels={barChartInfo.labels}
            data={barChartInfo.data}
          />
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          <AboutThirdContent
            labels={multiLineChartInfo.labels}
            data1={data1}
            data2={data2}
            data3={data3}
          />
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          <AboutFourthContent />
        </AboutWrapperComponent>
      </Outer>
    </BasePageComponent>
  );
};
const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
`;

export default AboutPlogging;

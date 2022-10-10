import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseChartContainer = ({ children }: BaseComponentType) => {
  return <ChartContainer>{children}</ChartContainer>;
};

const ChartContainer = styled.div`
  width: 80%;
`;

export default BaseChartContainer;

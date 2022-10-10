import { useState, useEffect } from "react";
import { aboutChartDataRequest } from "@/api/aboutFetcher";

interface ChartDataType {
  labels: Array<string>;
  data?: Array<number>;
  data1?: Array<number>;
  data2?: Array<number>;
  data3?: Array<number>;
}

const useChartData = (dataName: string, initialValue: ChartDataType) => {
  const [chartInfo, setCharttInfo] = useState<ChartDataType>(initialValue);

  useEffect(() => {
    (async () => {
      const res = await aboutChartDataRequest("/api/data", dataName);
      setCharttInfo(res);
    })();
  }, []);

  return [chartInfo];
};

export default useChartData;

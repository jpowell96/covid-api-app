import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";
import { CaseData, CaseStatus } from "./types";
import React from "react";

interface CaseChartProps {
  data: CaseData[];
  title: string;
  caseStatus: CaseStatus;
}

export const CaseChart = (props: CaseChartProps) => {
  const chartOptions: Highcharts.Options = {
    title: {
      text: props.title
    },
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "Number of Cases" } },

    series: [
      {
        type: "area",
        name: `Number of ${props.caseStatus} reported`,
        //Do something about the Date Formats to make it neater
        data: generateSeriesDataFromCaseData(props.data)
      }
    ]
  };

  function generateSeriesDataFromCaseData(cases: CaseData[]) {
    if (cases.length === 0) {
      return [];
    }
    //Generate an array of [time, total # of cases]
    const caseSeries = [];

    for (let i = 1; i < cases.length; i++) {
      const date = new Date(cases[i].Date); 
      caseSeries.push([date.getTime(), cases[i].Cases]);
    }

    return caseSeries;
  }

  return (
    <HighchartsReact
      options={chartOptions}
      constructorType={"chart"}
      highCharts={HighCharts}
    />
  );
};

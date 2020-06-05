/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { BarChart } from '../../src';
const data = [
  {
    year: "1991",
    value: 5
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  }
];

function Basic(options) {
  return (
    <div>
      <BarChart
        title="图表标题"
        data={data}
        yField="year"
        xField="value"
       >
       </BarChart>
    </div>
  );
}

export default Basic;

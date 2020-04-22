/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  Chart,
  Interval,
  Tooltip,
} from "../../src";

const data = [
  {
    year: "1991",
    value: 3
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
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
function Basic() {
  return (
    <div style={{ width: '100%', height: 50 }}>
      <Chart pure data={data} autoFit>
        <Interval position="year*value"/>
      </Chart>
    </div>
  );
}

export default Basic;

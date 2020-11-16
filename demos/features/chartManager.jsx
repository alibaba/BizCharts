import React, { useEffect, useState } from "react";
import {
  Chart,
  Interval,
  Coordinate,
  createTooltipConnector,
  Tooltip,
} from "../../src";

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5},
  { year: "1994", value: 5},
  { year: "1995", value: 4.9},
  { year: "1996", value: 6},
  { year: "1997", value: 7},
  { year: "1998", value: 9},
  { year: "1999", value: 13}
];

const data2 = [
  { year: "1991", value: 13 },
  { year: "1992", value: 44 },
  { year: "1993", value: 13.5},
  { year: "1994", value: 55},
  { year: "1995", value: 42.9},
  { year: "1996", value: 36},
  { year: "1997", value: 27},
  { year: "1998", value: 39},
  { year: "1999", value: 13}
];

const data3 = [
  { year: "1991", value: 33 },
  { year: "1992", value: 24 },
  { year: "1993", value: 31.5},
  { year: "1994", value: 52},
  { year: "1995", value: 242.9},
  { year: "1996", value: 6},
  { year: "1997", value: 57},
  { year: "1998", value: 29},
  { year: "1999", value: 13}
];

const tc = createTooltipConnector();

const Basic = () => {
  return (
    <div>
      <Chart data={data} height={100} autoFit>
        <Interval position="year*value" />
        <Coordinate transpose />
        <Tooltip shared linkage="tc" />
      </Chart>
      <Chart data={data2} height={100} autoFit >
        <Interval position="year*value" />
        <Coordinate transpose />
        <Tooltip shared linkage="tc" />
      </Chart>
      <Chart  data={data3} height={100} autoFit  >
        <Interval position="year*value" />
        <Coordinate transpose />
        <Tooltip shared linkage="tc" />
      </Chart>
    </div>
  );
}

export default Basic;

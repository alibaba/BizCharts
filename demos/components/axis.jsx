import React from "react";
import {
  Chart,
  Area,
  Axis,
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
  const cols = {
    value: {
      min: 0
    },
    year: {
      range: [0, 1]
    }
  };
  return (
    <div>
      <Chart height={400} padding="auto" data={data} scale={cols} autoFit>
        <Axis name="year" visible={false} />
        <Axis name="value" />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Area
          position="year*value"
          size={4}
          shape="circle"
          style={{
            stroke: "#fff",
            lineWidth: 1
          }}
        />
      </Chart>
    </div>
  );
}

export default Basic;

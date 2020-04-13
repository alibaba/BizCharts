/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  Chart,
  Interval,
  Tooltip,
  G2Function,
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
function CustLabel({dataSource}) {

  return <G2Function>
          {(chart) => {
            dataSource.forEach((item) => {
              chart
                .annotation()
                .text({
                  position: [item.type, item.value],
                  content: item.value,
                  style: {
                    textAlign: 'center',
                  },
                  offsetY: -30,
                })
                .text({
                  position: [item.type, item.value],
                  content: `${(item.percent * 100).toFixed(0)  }%`,
                  style: {
                    textAlign: 'center',
                  },
                  offsetY: -12,
                });
            });
          }}
        </G2Function>
}
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
      <Chart height={400} padding={0} data={data} scale={cols} autoFit>
        <Tooltip showMarkers={false} />
        <CustLabel data={data} />
        <Interval position="year*value"/>
      </Chart>
    </div>
  );
}

export default Basic;

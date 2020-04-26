/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  Chart,
  Interval,
  Tooltip,
  Effects,
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
  return <Effects>
          {(chart) => {
            dataSource.forEach((item) => {
              chart
                .annotation()
                .text({
                  position: [item.year, item.value],
                  content: item.value,
                  style: {
                    textAlign: 'center',
                  },
                })
                .text({
                  position: [item.year, item.value],
                  content: `${(item.value * 100).toFixed(0)  }%`,
                  style: {
                    textAlign: 'center',
                  },
                  offsetY: -12,
                });
            });
          }}
        </Effects>
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
      <Chart height={400} padding="auto" data={data} scale={cols} autoFit>
        <Tooltip showMarkers={false} />
        <CustLabel dataSource={data} />
        <Interval position="year*value"/>
      </Chart>
    </div>
  );
}

export default Basic;

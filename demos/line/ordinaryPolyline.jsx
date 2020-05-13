import React from 'react';
import { Chart, Line, Point } from '../../src';

// 数据源
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

function Demo() {
  return <Chart
    padding={[10,20,50,40]}
    autoFit
    height={500}
    data={data}
    scale={{ value: { min: 0 } }}
  >
    <Line position="year*value"  />
    <Point position="year*value" />
  </Chart>
}

export default Demo;

 

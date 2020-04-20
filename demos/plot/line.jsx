/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Line } from '@antv/g2plot';
import { Point, Axis, createPlot } from '../../src';

import { Text } from '../../src/components/Annotation';
import Tooltip from '../../src/components/Tooltip';

const LineChart = createPlot(Line);

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

function Basic(options) {
  return (
    <div>
      <LineChart
       data={data}
       xField="year"
       title={{
          visible: true,
          text: '曲线折线图',
       }}
       yField="value"
       {...options}
      >
        <Axis visible={false} name="value" />
        <Point position="year*value" />
        <Text position={ ['50%', '50%']} content="24 hours" />
        <Tooltip >
          {() => {
            return <div>123</div>
          }}
        </Tooltip>
      </LineChart>
    </div>
  );
}

export default Basic;


import React from "react";
import {
  Chart,
  Interval,
  Coordinate
} from "../../src";

const data = [
  { type: '一线城市', value: 0.19 },
  { type: '二线城市', value: 0.21 },
  { type: '三线城市', value: 0.27 },
  { type: '四线及以下', value: 0.33 },
];

export default function Demo() {
  return <Chart autoFit height={500} data={data}>
    <Interval position="value" adjust="stack" color="type" element-highlight />
    <Coordinate type="theta" radius={0.75} innerRadius={0.5} />
  </Chart>
}

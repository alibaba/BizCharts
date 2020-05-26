import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate
} from '../../src';

function Labelline () {
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: 'Other', value: 5 },
  ];


  return (
    <Chart height={400} data={data} autoFit>
      <Coordinate
        type="polar"
         startAngle={Math.PI} // 起始角度
         endAngle={Math.PI * (3 / 2)} // 结束角度
      />
      <Axis name="value" grid={{
        line: {
          type: 'circle',
        },
        closed: false,
      }} />
      <Tooltip showTitle={false} />
      <Interval
        position="type*value"
        adjust="stack"
        color={['type', 'rgb(252,143,72)-rgb(255,215,135)']}
        element-highlight
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['value', {
          offset: -15,
          style: {
            textAlign: 'center',
            fill: '#000',
          },
        }]}
      />
    </Chart>
  );
}

export default Labelline;

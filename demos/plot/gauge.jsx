import React from 'react';
import { GaugeChart } from '../../src';

function Demo() {
  return (
    <GaugeChart
      title={{
        visible: true,
        text: '仪表盘',
      }}
      width={400}
      height={400}
      value={64}
      min={10}
      max={100}
      range={[25, 50, 75, 100]}
      color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
      statistic={{
        title: {
          content: '标题',
        },
        content: {
          content: '内容',
        },
      }}
    />
  );
}

export default Demo;

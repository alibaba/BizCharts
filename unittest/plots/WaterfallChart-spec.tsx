import React from 'react';
import WaterfallChart from '../../src/plots/WaterfallChart';
import { render, cleanup } from '@testing-library/react';

// 数据源
const data = [
  { type: '日用品', money: 120 },
  { type: '伙食费', money: 900 },
  { type: '交通费', money: 200 },
  { type: '水电费', money: 300 },
  { type: '房租', money: 1200 },
  { type: '商场消费', money: 1000 },
  { type: '应酬红包', money: -2000 },
];

describe('Plots-WaterfallChart', () => {
  test('基础WaterfallChart', () => {
    let chart = null;
    render(<WaterfallChart
      data={data}
      title={{
        visible: true,
        text: '每月收支情况（瀑布图）',
      }}
      autoFit
      padding="auto"
      xField='type'
      yField='money'
      meta={{
        type: {
          alias: '类别',
        },
        money: {
          alias: '金额',
        },
      }}

      onGetG2Instance={(c) => {
        chart = c;
      }}
    />);
    cleanup();
  });
});

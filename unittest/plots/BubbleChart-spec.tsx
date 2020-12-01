import React from 'react';
import BubbleChart from '../../src/plots/BubbleChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  { type: '家具家电', sales: 38 },
  { type: '粮油副食', sales: 52 },
  { type: '生鲜水果', sales: 61 },
  { type: '美容洗护', sales: 145 },
  { type: '母婴用品', sales: 48 },
  { type: '进口食品', sales: 38 },
  { type: '食品饮料', sales: 38 },
  { type: '家庭清洁', sales: 38 },
];

describe('Plots-BubbleChart', () => {
  test('pointSize --> size', () => {
    let chart = null;
    render(<BubbleChart
      data={MOCK_DATA}
      xField="sales"
      yField="type"
      sizeField="sales"
      pointSize={[10,50]}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.size).toEqual([10,50]);
    cleanup();
  });
})

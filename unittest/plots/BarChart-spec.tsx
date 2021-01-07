import React from 'react';
import BarChart from '../../src/plots/BarChart';
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

describe('Plots-BarChart', () => {
  test('基础条形图', () => {
    let chart = null;
    render(<BarChart
      data={MOCK_DATA}
      xField="sales"
      yField="type"
      colorField="type"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
  })
  test('colorField --> seriesField', () => {
    let chart = null;
    render(<BarChart
      data={MOCK_DATA}
      xField="sales"
      yField="type"
      colorField="type"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.seriesField).toBe('type');
    cleanup();
  });
})

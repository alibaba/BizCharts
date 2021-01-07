import React from 'react';
import FunnelChart from '../../src/plots/FunnelChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  { action: '浏览网站', pv: 50000, quarter: '2020Q1' },
  { action: '放入购物车', pv: 35000, quarter: '2020Q1' },
  { action: '生成订单', pv: 25000, quarter: '2020Q1' },
  { action: '支付订单', pv: 15000, quarter: '2020Q1' },
  { action: '完成交易', pv: 11500, quarter: '2020Q1' },
  { action: '浏览网站', pv: 80000, quarter: '2020Q2' },
  { action: '放入购物车', pv: 63000, quarter: '2020Q2' },
  { action: '生成订单', pv: 47000, quarter: '2020Q2' },
  { action: '支付订单', pv: 24000, quarter: '2020Q2' },
  { action: '完成交易', pv: 17500, quarter: '2020Q2' },
];


describe('Plots-FunnelChart', () => {
  test('旧版漏斗图 transpose --> isTransposed', () => {
    let chart = null;
    render(<FunnelChart
      data={MOCK_DATA}
      xField='action'
      yField='pv'
      compareField='quarter'
      transpose
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    expect(chart.options.isTransposed).toBe(true);
    cleanup();
  })
  test('基础漏斗图', () => {
    let chart = null;
    render(<FunnelChart
      data={MOCK_DATA}
      xField='action'
      yField='pv'
      compareField='quarter'
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
  test('水平漏斗图', () => {
    let chart = null;
    render(<FunnelChart
      data={MOCK_DATA}
      xField='action'
      yField='pv'
      compareField='quarter'
      isTransposed
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
})

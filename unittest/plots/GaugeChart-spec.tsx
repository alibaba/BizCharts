import React from 'react';
import GaugeChart from '../../src/plots/GaugeChart';
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


describe('Plots-GaugeChart', () => {
  test('旧版仪表图', () => {
    let chart = null;
    render(<GaugeChart
      title={{
        visible: true,
        text: '旧版仪表图',
      }}
      width={400}
      height={400}
      value={78}
      min={0}
      max={100}
      // @ts-ignore
      range={[0, 1 / 3, 2 / 3, 1]}
      color={['#F4664A', '#FAAD14', '#30BF78']}
      statistic={{
        text: '优',
        color: '#30bf78',
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
  test('基础仪表图', () => {
    let chart = null;
    render(<GaugeChart
      title={{
        visible: true,
        text: '基础仪表图',
      }}
      width={400}
      height={400}
      percent={0.75}
      // @ts-ignore
      range={{
        ticks: [0, 1 / 3, 2 / 3, 1],
        color: ['#F4664A', '#FAAD14', '#30BF78'],
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options).toMatchSnapshot();
    cleanup();
  })
})

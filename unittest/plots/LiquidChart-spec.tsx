import React from 'react';
import LiquidChart from '../../src/plots/LiquidChart';
import { render, cleanup } from '@testing-library/react';

describe('Plots-LiquidChart', () => {
  test('兼容旧版LiquidChart', () => {
    let chart = null;
    render(<LiquidChart 
      title={{
        visible: true,
        text: '水波图',
      }}
      max={10000}
      value={5639}
      // percent={0.5}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options.percent).toBe(5639 / 10000);
    expect(chart.options).toMatchSnapshot();
    cleanup()
  })
  test('新版使用', () => {
    let chart = null;
    render(<LiquidChart 
      title={{
        visible: true,
        text: '水波图',
      }}
      percent={0.5}
      outline={{
        border: 4,
        distance: 8,
      }}
      wave={{
        length: 128,
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    // cleanup()
  })
})

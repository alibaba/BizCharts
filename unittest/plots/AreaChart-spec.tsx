import React, { useEffect, useState } from 'react';
import AreaChart from '../../src/plots/AreaChart';
import Effects from '../../src/components/Effects';
import { render, act, cleanup } from '@testing-library/react';

const MOCK_DATA = [{
  "Date": "2010-01",
  "scales": 1998
},
{
  "Date": "2010-02",
  "scales": 1250
},
{
  "Date": "2010-03",
  "scales": 1720
}];

const chartInstance = 

describe('基础功能-以AreaChart为demo', () => {
  
  test('line & point visible', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      line={{ visible: false }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    console.log(chart)
    expect(chart.options.height).toBe(336);
    // cleanup();
  });
  
  test('guideLine-max', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      line={{ visible: false }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    console.log(chart)
    expect(chart.options.height).toBe(336);
    // cleanup();
  });
  test('guideLine-min', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      line={{ visible: false }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    console.log(chart)
    expect(chart.options.height).toBe(336);
    // cleanup();
  });
  test('guideLine-mean', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      line={{ visible: false }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    console.log(chart)
    expect(chart.options.height).toBe(336);
    // cleanup();
  });
})

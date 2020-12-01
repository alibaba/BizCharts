import React from 'react';
import AreaChart from '../../src/plots/AreaChart';
import { render, cleanup } from '@testing-library/react';

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


describe('Plots-AreaChart', () => {
  test('line & point visible', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      line={{ visible: false }}
      // @ts-ignore
      point={{ visible: false }}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.line).toBe(false);
    expect(chart.options.point).toBe(false);
    cleanup();
  });
  
  test('guideLine-max/mean/min', () => {
    let chart = null;
    render(<AreaChart
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      // @ts-ignore
      guideLine={[{
        type: 'max'
      }, {
        type: 'mean'
      }, {
        type: 'min'
      }]}
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.annotations.length).toBe(3);
    expect(chart.options.annotations[0].type).toBe('line');
    expect(chart.options.annotations[0].end[1]).toBe(1998);
    expect(chart.options.annotations[1].end[1]).toBe((1998 + 1250 + 1720) / 3);
    cleanup();
  });
});

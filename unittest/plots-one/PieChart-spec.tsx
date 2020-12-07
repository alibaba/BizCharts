import React from 'react';
import PieChart from '../../src/plots/PieChart';
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


describe('Plots-PieChart', () => {
  test('autoFit&forceFit', () => {
    let chart = null;
    render(<PieChart
      padding={[90,90,90,90]}
      data={MOCK_DATA}
      angleField="scales"
      colorField="Date"
      forceFit
      width={600}
      height={500}
      label={{}}
      onGetG2Instance={
        (c) => chart = c
      }
    />)

    expect(chart.options.forceFit).toBe(true);
    // expect(chart.options.autoFit).toBe(true); // autoFit被转成了forceFit,所以不测试autoFit
    expect(chart.options.width).toBe(600);
    // cleanup();
  });

});

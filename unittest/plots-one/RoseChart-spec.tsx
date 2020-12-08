import React from 'react';
import RoseChart from '../../src/plots/RoseChart';
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


describe('Plots-RoseChart', () => {
  test('新版本的基础玫瑰图', () => {
    let chart = null;
    render(<RoseChart
      padding={[90, 90, 90, 90]}
      data={MOCK_DATA}
      xField="Date"
      yField="scales"
      seriesField="Date"
      autoFit
      width={600}
      height={500}
      title="基础玫瑰图"
      onGetG2Instance={
        (c) => chart = c
      }
    />)

    expect(chart.options.xField).toBe('Date');
    expect(chart.options.yField).toBe('scales');
    expect(chart.options.seriesField).toBe('Date');
    // // expect(chart.options.autoFit).toBe(true); // autoFit被转成了forceFit,所以不测试autoFit
    // cleanup();
  });

  test('使用老版本的基础玫瑰图categoryField*radiusField*Date', () => {
    let chart = null;
    // @ts-ignore
    render(<RoseChart
      padding={[90, 90, 90, 90]}
      data={MOCK_DATA}
      categoryField="Date"
      radiusField="scales"
      colorField="Date"
      autoFit
      width={600}
      height={500}
      title="使用老版本的categoryField*radiusField*Date"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.xField).toBe('Date');
    expect(chart.options.yField).toBe('scales');
    expect(chart.options.seriesField).toBe('Date');

    // // expect(chart.options.autoFit).toBe(true); // autoFit被转成了forceFit,所以不测试autoFit
    // cleanup();
  });

});

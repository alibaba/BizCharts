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

  test('legend', () => {
    let chart = null;
    const data = [
      {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
      },
      {
        month: "Jan",
        city: "London",
        temperature: 3.9
      },
      {
        month: "Feb",
        city: "Tokyo",
        temperature: 13
      },
      {
        month: "Feb",
        city: "London",
        temperature: 4.2
      },
      {
        month: "Mar",
        city: "Tokyo",
        temperature: 16.5
      },
      {
        month: "Mar",
        city: "London",
        temperature: 5.7
      },
      {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
      },
      {
        month: "Apr",
        city: "London",
        temperature: 8.5
      },
      {
        month: "May",
        city: "Tokyo",
        temperature: 10
      },
      {
        month: "May",
        city: "London",
        temperature: 11.9
      },
      {
        month: "Jun",
        city: "Tokyo",
        temperature: 7.5
      },
      {
        month: "Jun",
        city: "London",
        temperature: 15.2
      },
      {
        month: "Jul",
        city: "Tokyo",
        temperature: 9.2
      },
      {
        month: "Jul",
        city: "London",
        temperature: 17
      },
      {
        month: "Aug",
        city: "Tokyo",
        temperature: 14.5
      },
      {
        month: "Aug",
        city: "London",
        temperature: 16.6
      },
      {
        month: "Sep",
        city: "Tokyo",
        temperature: 9.3
      },
      {
        month: "Sep",
        city: "London",
        temperature: 14.2
      },
      {
        month: "Oct",
        city: "Tokyo",
        temperature: 8.3
      },
      {
        month: "Oct",
        city: "London",
        temperature: 10.3
      },
      {
        month: "Nov",
        city: "Tokyo",
        temperature: 8.9
      },
      {
        month: "Nov",
        city: "London",
        temperature: 5.6
      },
      {
        month: "Dec",
        city: "Tokyo",
        temperature: 5.6
      },
      {
        month: "Dec",
        city: "London",
        temperature: 9.8
      }
    ];

    const legendOptions = {

      position: "bottom",
      formatter: (val) => `${val}%`,
      offsetX: 40,
      offsetY: 8,
      title: {
        visible: false, // TODO
        text: 2,
        style: {
          fill: "red",
        },
      },
      marker: {
        symbol: "circle",
      },
      text: { // TODO
        style: {
          fill: "pink",
          stroke: "pink",
        },
        formatter: (val) => `${val}$`,
      },
    };

    render(<AreaChart
      data={data}
      xField='month'
      yField='temperature'
      seriesField="city"
      // @ts-ignore
      legend={legendOptions}
      title={{
        text: 'legend-双曲线图'
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    // cleanup();
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

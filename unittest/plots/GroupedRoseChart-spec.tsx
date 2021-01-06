import React from 'react';
import GroupedRoseChart from '../../src/plots/GroupedRoseChart';
import { render, cleanup } from '@testing-library/react';


const MOCK_DATA = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];
const basicCfg = {
  data: MOCK_DATA,
  xField: "月份",
  yField: "月均降雨量",
  seriesField: "name",
  autoFit: true,
}


describe('Plots-GroupedRoseChart', () => {
  test('新版本分组玫瑰图xField*yField*seriesField', () => {
    let chart = null;
    render(<GroupedRoseChart
      title="新版本分组玫瑰图xField*yField*seriesField"
      {...basicCfg}
      onGetG2Instance={
        (c) => chart = c
      }
    />)

    expect(chart.options.xField).toBe('月份');
    expect(chart.options.yField).toBe('月均降雨量');
    expect(chart.options.seriesField).toBe('name');
    cleanup();
  });

  test('老版本categoryField*radiusField*groupField', () => {
    let chart = null;
    // @ts-ignore
    render(<GroupedRoseChart
      data={MOCK_DATA}
      categoryField="月份"
      radiusField="月均降雨量"
      groupField="name"
      autoFit
      title="老版本基础分组玫瑰图categoryField*radiusField*groupField"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.categoryField).toBe('月份');
    expect(chart.options.radiusField).toBe('月均降雨量');
    expect(chart.options.groupField).toBe('name');
    cleanup();
  });



  test('基础分组玫瑰图', () => {
    render(<GroupedRoseChart
      {...basicCfg}
      title="基础分组玫瑰图"
      pixelRatio={3}
      renderer="svg"
      meta={{
        月份: {
          formatter: val => `${val}%`
        }
      }}
      radius={0.9}
      innerRadius={0.1}
      // color={['red', 'green']}
      color={({ name }) => {
        if (name === 'London') return 'red';
        return 'blue';
      }}
      sectorStyle={{
        stroke: 'black',
        lineDash: [5, 5],
      }}
    />);
    cleanup();
  });


  test('legend-分组玫瑰图', () => {
    let chart = null;
    const fn = jest.fn(val => `${val}%`);
    const fn2 = jest.fn(val => `${val}%`);
    render(<GroupedRoseChart
      title="legend-分组玫瑰图"
      {...basicCfg}
      legend={{
        visible: true,
        position: "bottom",
        formatter: fn, //  text 的优先度大于formatter
        offsetX: 40,
        offsetY: 2,
        title: {
          text: '2',
          style: {
            fill: "red",
          },
        },
        marker: {
          symbol: "circle",
        },
        text: {
          style: {
            fill: "pink",
            stroke: "pink",
          },
          formatter: fn2,
        },
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(fn).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('tooltip-分组玫瑰图', () => {
    let chart = null;
    render(<GroupedRoseChart
      title="tooltip-分组玫瑰图"
      {...basicCfg}
      meta={{
        name: {
          formatter: val => val === 'London' ? '伦敦' : '柏林'
        }
      }}
      tooltip={{
        visible: true,
        offset: 10,
        shared: true,
        showCrosshairs: true,
        crosshairs: { type: 'y' },
        fields: ['name', '月均降雨量'],
        formatter: (item) => ({ value: item['月均降雨量'], name: item.name === 'London' ? '伦敦' : '柏林' })
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
  });

  test('label-分组玫瑰图', () => {
    let chart = null;
    render(<GroupedRoseChart
      title="label-分组玫瑰图"
      {...basicCfg}
      label={{
        visible: true,
        autoRotate: true,
        formatter: (item) => `${item['月份']}val`,
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'red',
        }
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
  });

});

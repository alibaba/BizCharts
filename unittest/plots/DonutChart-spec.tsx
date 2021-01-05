import React from 'react';
import DonutChart from '../../src/plots/DonutChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  {
    type: '分类一',
    value: 27456,
  },
  {
    type: '分类二',
    value: 25234,
  },
  {
    type: '分类三',
    value: 345678,
  },
  {
    type: '分类四',
    value: 234564,
  },
  {
    type: '分类五',
    value: 234567,
  },
  {
    type: '其它',
    value: 123456,
  },
];

const padding = [90, 90, 90, 90];

const basicCfg = {
  padding: padding,
  data: MOCK_DATA,
  angleField: "value",
  colorField: "type",
  forceFit: true,
  width: 500,
  height: 500,
}

describe('Plots-DonutChart', () => {
  test('基础环形图', () => {
    render(<DonutChart
      {...basicCfg}
      title="基础环形图"
      pixelRatio={3}
      renderer="svg"
      meta={{
        type: {
          formatter: val => `${val}%`
        }
      }}
      radius={1}
      innerRadius={0.66}
      color={['red', 'green', 'yellow','black','orange']}
      // color={({ type }) => {
      //   if (type === '分类五') return 'red';
      //   return 'blue';
      // }}
      pieStyle={{
        stroke: 'black',
        lineDash: [5, 5],
      }}
    />);
    cleanup();
  });


  test('legend-环形图', () => {
    render(<DonutChart
      title="legend-环形图"
      {...basicCfg}
      legend={{
        visible: true,
        position: "bottom",
        formatter: val => `${val}%`, //  text 的优先度大于formatter
        offsetX: 40,
        offsetY: 2,
        title: {
          visible: true,
          text: 'legend title',
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
          formatter: (val) => `${val}$`,
        },
      }}
    />);
    cleanup();
  });


  test('tooltip-环形图', () => {
    render(<DonutChart
      title="tooltip-环形图"
      {...basicCfg}
      tooltip={{
        visible: true,
        offset: 10,
        // shared: true,
        showCrosshairs: true,
        crosshairs: { type: 'y' },
        fields: ['type', 'value'],
        formatter: ({ type, value }) => ({ value, name: `${type}-cust` })
      }}
    />);
    cleanup();
  });

  test('label-环形图', () => {
    const cc = {
      label: {
        visible: true,
        type: 'outer',
        autoRotate: true,
        formatter: ({ value }) => `val-${value}`,
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'red',
        },
      }
    }
    render(<DonutChart
      title="label-环形图"
      {...basicCfg}
      {...cc}
    />);
    cleanup();
  });
});

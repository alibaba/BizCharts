import React, { useState } from 'react';
import PieChart from '../../src/plots/PieChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = [
  {
    type: '分类一',
    value: 2745678987654323456789098765432345678,
  },
  {
    type: '分类二',
    value: 252345678909876543456789987654345678,
  },
  {
    type: '分类三',
    value: 345678998765434567876545678876345678,
  },
  {
    type: '分类四',
    value: 234567809876544567890123456788765678,
  },
  {
    type: '分类五',
    value: 234567854345678987655678987655678987,
  },
  {
    type: '其它',
    value: 123456789876789098767898765678909876,
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
const Demo = (props) => {
  const [state, setState] = useState(1);

  return (<div>
    <a onClick={() => setState(state + 1)}>
      click:{state}
    </a>
    <PieChart
      {...basicCfg}
      title="click 后动画不更新"
      {...props}
    />
  </div >)
}

describe('Plots-PieChart', () => {
  test('click 后动画不更新', () => {
    render(<Demo />);
    cleanup();
  });

  test('基础饼图', () => {
    let chart = null;
    render(<PieChart
      {...basicCfg}
      title="基础饼图"
      pixelRatio={3}
      renderer="svg"
      meta={{
        type: {
          formatter: val => `${val}%`
        }
      }}
      radius={0.8}
      // innerRadius={0.6}
      color={['red', 'green', 'yellow','black','orange']}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('legend-饼图:text转itemName', () => {
    const fn = jest.fn(val => `${val}%`);
    const fn2 = jest.fn(val => `${val}%`);
    let chart = null;
    render(<PieChart
      title="legend-饼图"
      {...basicCfg}
      legend={{
        visible: true,
        position: "bottom",
        formatter: fn, //  text 的优先度大于formatter
        offsetX: 40,
        offsetY: 2,
        title: {
          visible: true,
          text: 'legend tile',
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
    cleanup();
  });


  test('tooltip饼图', () => {
    let chart = null;
    render(<PieChart
      title="tooltip-饼图"
      {...basicCfg}
      onGetG2Instance={
        (c) => chart = c
      }
      tooltip={{
        visible: true,
        offset: 10,
        // shared: true,
        showCrosshairs: true,
        crosshairs: { type: 'y' },
        fields: ['type', 'value'],
        formatter: ({ type, value }) => ({ value, name: `${type}-tyz` })
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('label饼图', () => {
    let chart = null;
    const opt = {
      data: MOCK_DATA,
      width: 500,
      height: 500,
      angleField: 'value',
      colorField: 'type',
      autoFit: false,
      radius: 0.4,
      label: {
        type: 'outer',
        autoRotate: true,
        formatter: ({ value }) => `val-${value}`,
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'red',
        },
        autoHide: false,
      }
    }
    render(<PieChart
      title="label饼图"
      {...opt}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
});

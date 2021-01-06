import React from 'react';
import RadarChart from '../../src/plots/RadarChart';
import { render, cleanup } from '@testing-library/react';


// 数据源
const data = [
  {
    item: "Design",
    user: "a",
    score: 70,
  },
  {
    item: "Design",
    user: "b",
    score: 30,
  },
  {
    item: "Development",
    user: "a",
    score: 60,
  },
  {
    item: "Development",
    user: "b",
    score: 70,
  },
  {
    item: "Marketing",
    user: "a",
    score: 60,
  },
  {
    item: "Marketing",
    user: "b",
    score: 50,
  },
  {
    item: "Users",
    user: "a",
    score: 40,
  },
  {
    item: "Users",
    user: "b",
    score: 50,
  },
  {
    item: "Test",
    user: "a",
    score: 60,
  },
  {
    item: "Test",
    user: "b",
    score: 70,
  },
  {
    item: "Language",
    user: "a",
    score: 70,
  },
  {
    item: "Language",
    user: "b",
    score: 50,
  },
  {
    item: "Technology",
    user: "a",
    score: 50,
  },
  {
    item: "Technology",
    user: "b",
    score: 40,
  },
  {
    item: "Support",
    user: "a",
    score: 30,
  },
  {
    item: "Support",
    user: "b",
    score: 40,
  },
  {
    item: "Sales",
    user: "a",
    score: 60,
  },
  {
    item: "Sales",
    user: "b",
    score: 40,
  },
  {
    item: "UX",
    user: "a",
    score: 50,
  },
  {
    item: "UX",
    user: "b",
    score: 60,
  },
];

describe('Plots-RadarChart', () => {
  test('基础-雷达图', () => {
    let chart = null;
    // @ts-ignore
    render(<RadarChart
      height={600}
      forceFit
      data={data}
      pixelRatio={3}
      renderer="svg"
      title={{
        visible: true,
        text: "基础-雷达图",
      }}
      meta={{
        score: {
          min: 0,
        },
        item: {
          formatter: (v) => `${v}个`,
        }
      }}
      angleField="item"
      radiusField="score"
      seriesField="user"
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    // console.log(chart.options, 999)
    expect(chart.options.angleField).toBe(chart.options.xField);
    expect(chart.options.radiusField).toBe(chart.options.yField);
    expect(chart.options.angleField).toBe('item');
    expect(chart.options.radiusField).toBe('score');
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });



  test('基础2-雷达图', () => {
    let chart = null;
    render(<RadarChart
      data={data}
      title={{
        visible: true,
        text: "基础2-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      color={({ user }) => {
        return (user === 'a' ? 'red' : 'yellow');
      }}
      smooth
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('area-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      data={data}
      title={{
        visible: true,
        text: "基础2-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      area={{
        visible: true,
        style: {
          fillOpacity: 0.3,
        }
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('point-雷达图', () => {
    let chart = null;
    render(<RadarChart
      data={data}
      title={{ visible: true, text: "point-雷达图", }}
      xField="item"
      yField="score"
      seriesField="user"
      point={{
        visible: true,
        shape: 'square',
        style: {
          fillOpacity: 0.8,
        },
        size: 4,
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('line-雷达图', () => {
    let chart = null;
    render(<RadarChart
      data={data}
      title={{ visible: true, text: "line-雷达图", }}
      xField="item"
      yField="score"
      seriesField="user"
      line={{
        visible: true,
        size: 4,
        style: {
          lineDash: [6, 6],
        },
      }}
      onGetG2Instance={
        (c) => chart = c
      }
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('angleAxis-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      data={data}
      title={{ visible: true, text: "angleAxis-雷达图", }}
      xField="item"
      yField="score"
      seriesField="user"
      angleAxis={{
        line: {
          visible: true,
          style: {
            stroke: "black",
            lineWidth: 2,
            lineDash: [4, 5],
            strokeOpacity: 0.7,
            shadowColor: "black",
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: "pointer",
          },
        },
        grid: {
          visible: true,
          line: {
            style: {
              stroke: "orange",
              lineWidth: 2,
              lineDash: [4, 5],
            },
          },
        },
        label: {
          visible: true,
          formatter: (val) => `${val}$`,
          // suffix: "%",
          offsetX: 4,
          offsetY: 4,
          style: {
            fill: "red",
          },
          autoHide: true,
          autoRotate: true,
        },
        tickLine: {
          visible: true,
          style: {
            fill: "blue",
            stroke: "blue",
          },
        },
        title: {
          visible: true,
          text: "名称",
          offset: 50,
          style: {
            fill: "blue",
          },
        },

      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('radiusAxis-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      height={500}
      data={data}
      title={{
        visible: true,
        text: "radiusAxis-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      radiusAxis={{
        grid: {
          alternateColor: "pink",
          line: {
            // type: "line", // 展开注释就成了线条
            style: {
              stroke: "purple",
            },
          },
        },
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('legend-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      height={500}
      data={data}
      title={{
        visible: true,
        text: "legend-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      legend={{
        position: "bottom",
        formatter: val => `${val}%`,
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
          formatter: (val) => `${val}$`,
        },
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });


  test('tooltip-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      height={500}
      data={data}
      title={{
        visible: true,
        text: "tooltip-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      tooltip={{
        visible: true,
        offset: 10,
        shared: true,
        showCrosshairs: true,
        crosshairs: { type: 'y' },
        fields: ['user', 'score'],
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });

  test('label-雷达图', () => {
    let chart = null;
    render(<RadarChart
      onGetG2Instance={
        (c) => chart = c
      }
      data={data}
      title={{
        visible: true,
        text: "label-雷达图",
      }}
      xField="item"
      yField="score"
      seriesField="user"
      label={{
        visible: true,
        autoRotate: true,
        formatter: ({ score }) => `${score}val`,
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: 'red',
        }
      }}
    />);
    expect(chart.options).toMatchSnapshot();
    cleanup();
  });
});

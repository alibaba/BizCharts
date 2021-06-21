import React from 'react';
import {Chart, DonutChart } from '../../src';
import { render, cleanup } from '@testing-library/react';

// 数据源
const data = [
  {
    type: "分类一字数补丁",
    value: 27,
  },
  {
    type: "分类二字数补丁",
    value: 25,
  },
  {
    type: "分类三字数补丁",
    value: 18,
  },
  {
    type: "分类四字数补丁",
    value: 15,
  },
  {
    type: "分类五字数补丁",
    value: 10,
  },
  {
    type: "分类六字数补丁",
    value: 18,
  },
  {
    type: "分类七字数补丁",
    value: 15,
  },
  {
    type: "分类八字数补丁",
    value: 10,
  },
  {
    type: "其它字数补丁",
    value: 5,
  },
];



describe('geomtrys-Interval', () => {
	test('has one geometry', async () => {
		let chart = null;
    render(
      <DonutChart
        appendPadding={10}
        data={data || []}
        title={{
          visible: true,
          text: "环图",
        }}
        autoFit
        // renderer="svg"
        description={{
          visible: true,
          text: "canvas 下图例有截断问题，svg 下图例有分页展示数据不正确问题",
        }}
        height={350}
        radius={0.8}
        padding="auto"
        angleField="value"
        colorField="type"
        legend={{
          position: 'bottom'
        }}
        onGetG2Instance={c => chart = c}
    />);
		expect(chart.chart.geometries.length).toBe(1);
		expect(chart.chart.geometries[0].type).toBe('interval');
		cleanup()
	})

})

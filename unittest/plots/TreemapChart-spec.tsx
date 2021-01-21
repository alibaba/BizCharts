import React from 'react';
import TreemapChart from '../../src/plots/TreemapChart';
import { render, cleanup } from '@testing-library/react';

const MOCK_DATA = {
    name: "root",
    children: [
      {
        name: "分类 1",
        value: 900,
        type: "mm",
        children: [
          { name: "分类 1-1", value: 120, type: "a" },
          { name: "分类 1-2", value: 120, type: "a" },
          { name: "分类 1-3", value: 120, type: "a" },
          { name: "分类 1-4", value: 120, type: "a" },
          { name: "分类 1-5", value: 120, type: "a" },
          { name: "分类 1-6", value: 300, type: "a" },
        ],
      },
      { name: "分类 2", value: 500, type: "b" },
      { name: "分类 3", value: 150, type: "d" },
      { name: "分类 4", value: 140, type: "e" },
      { name: "分类 5", value: 115, type: "f" },
      { name: "分类 6", value: 95, type: "g" },
      { name: "分类 7", value: 90, type: "h" },
      { name: "分类 8", value: 75, type: "i" },
      { name: "分类 9", value: 98, type: "j" },
      { name: "分类 10", value: 60, type: "k" },
      { name: "分类 11", value: 45, type: "l" },
      { name: "分类 12", value: 40, type: "m" },
      { name: "分类 13", value: 40, type: "n" },
      { name: "分类 14", value: 35, type: "o" },
      { name: "分类 15", value: 40, type: "p" },
      { name: "分类 16", value: 40, type: "q" },
      { name: "分类 17", value: 40, type: "r" },
      { name: "分类 18", value: 30, type: "s" },
      { name: "分类 19", value: 28, type: "t" },
      { name: "分类 20", value: 16, type: "u" },
    ],
  };
  

function processData(data) {
    let sumValue = 0;
    data.children.map((d) => {
        sumValue += d.value;
    });
    data.value = sumValue;
    return data;
}


const basicCfg = {
    data: MOCK_DATA,
   
    title: {
        visible: true,
        text: "矩形树图",
    },
    colorField: "type",
    tooltip: {
        visible: true,
    },
}


describe('Plots-TreemapChart', () => {
    test('基础TreemapChart', () => {
        let chart = null;
        render(<TreemapChart
            {...basicCfg}
            onGetG2Instance={(c) => {
                chart = c;
            }}
        />);
        expect(chart.options.maxLevel).toBe(2);
        // expect(chart.options).toMatchSnapshot();
        cleanup();
    });
});

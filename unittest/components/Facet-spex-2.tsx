import React, { useEffect, useState } from 'react';
import { Chart, Tooltip, Legend, Facet, getTheme } from "../../src";
import '../../src/core';
import { render, act } from '@testing-library/react';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TrendFacetChart = (props) => {
  const { data, indexNameColorMap, typeNameMap } = props;
  console.log('999', props);
  return (
    <Chart
      autoFit
      data={data}
      // forceUpdate
      height={400}
      padding={[20, 20, 20, 70]}
      appendPadding={[10]}
    >
      <Legend
        visible={true}
        itemName={{
          formatter: (text, item) => {
            // console.log(text, item);
            return typeNameMap[text];
          },
        }}
      />
      <Tooltip showMarkers={false} />
      <Facet
        fields={['indexCode']}
        type="rect"
        columnTitle={{
          offsetY: -15,
          style: {
            fontSize: 14,
            fontWeight: 300,
            fill: '#505050',
          },
          formatter: (val) => {
            const title = indexNameColorMap[val].title;
            return title;
          },
        }}
        eachView={(view, facet) => {
          view.coordinate().transpose();
          if (facet.columnIndex === 0) {
            view.axis('timeDate', {
              tickLine: null,
              line: null,
            });
            view.axis('value', false);
          } else {
            view.axis(false);
          }

          const color = indexNameColorMap[facet.columnValue].color;
          view
            .interval()
            .adjust('stack')
            .position('timeDate*value')
            .color('type', [color, '#ebedf0'])
            .style({
              fillOpacity: 0.5,
            })
            .size(20)
            .label('value*type', (value, type) => {
              if (type === 'remain') {
                return null;
              }
              // const offset = value < 30 ? 10 : -4;
              return {
                // title: typeMap[type],
                content: `${value}%`,
                // offset,
                style: { fill: '#505050', textAlign: 'left' },
              };
            })
            .tooltip(
              'timeDate*value*indexCode*type',
              (timeDate, value, indexCode, type) => {
                return {
                  title: `日期：${timeDate}`,
                  value: `${type} : ${value}%`,
                  name: indexCode,
                };
              }
            );
          view.interaction('element-active');
        }}
      />
    </Chart>
  );
};


const chartTheme = getTheme().colors10;
const myIndexNameColorMap = {
	reg_suc_rate: {
		title: "注册成功率",
		color: chartTheme[0],
	},
	reg_intention_rate: {
		title: "注册意愿率",
		color: chartTheme[1],
	},
	login_suc_rate: {
		title: "登录成功率",
		color: chartTheme[2],
	},
	login_intention_rate: {
		title: "登录意愿率",
		color: chartTheme[3],
	},
};

const myTypeNameMap = {
	done: '已实现',
	remain: '待提升空间'
}

const myData = [
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210101",
		type: "done",
		value: 10.8,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210101",
		type: "remain",
		value: 89.2,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210102",
		type: "done",
		value: 72.9,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210102",
		type: "remain",
		value: 27.1,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210103",
		type: "done",
		value: 2.8,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210103",
		type: "remain",
		value: 97.2,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210104",
		type: "done",
		value: 49.1,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210104",
		type: "remain",
		value: 50.9,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210105",
		type: "done",
		value: 11.6,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210105",
		type: "remain",
		value: 88.4,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210106",
		type: "done",
		value: 23.8,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210106",
		type: "remain",
		value: 76.2,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210107",
		type: "done",
		value: 2.9,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210107",
		type: "remain",
		value: 97.1,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210108",
		type: "done",
		value: 2.7,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210108",
		type: "remain",
		value: 97.3,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210109",
		type: "done",
		value: 3.6,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210109",
		type: "remain",
		value: 96.4,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210110",
		type: "done",
		value: 1.3,
	},
	{
		indexCode: "reg_suc_rate",
		timeDate: "20210110",
		type: "remain",
		value: 98.7,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210101",
		type: "done",
		value: 175.4,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210101",
		type: "remain",
		value: 24.6,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210102",
		type: "done",
		value: 165.2,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210102",
		type: "remain",
		value: 34.8,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210103",
		type: "done",
		value: 108.4,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210103",
		type: "remain",
		value: 91.6,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210104",
		type: "done",
		value: 73.2,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210104",
		type: "remain",
		value: 126.8,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210105",
		type: "done",
		value: 46.9,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210105",
		type: "remain",
		value: 153.1,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210106",
		type: "done",
		value: 38.6,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210106",
		type: "remain",
		value: 161.4,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210107",
		type: "done",
		value: 22,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210107",
		type: "remain",
		value: 178,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210108",
		type: "done",
		value: 12.1,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210108",
		type: "remain",
		value: 187.9,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210109",
		type: "done",
		value: 5.5,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210109",
		type: "remain",
		value: 194.5,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210110",
		type: "done",
		value: 1.8,
	},
	{
		indexCode: "login_suc_rate",
		timeDate: "20210110",
		type: "remain",
		value: 198.2,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210101",
		type: "done",
		value: 6.2,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210101",
		type: "remain",
		value: 93.8,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210102",
		type: "done",
		value: 44.1,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210102",
		type: "remain",
		value: 55.9,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210103",
		type: "done",
		value: 2.6,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210103",
		type: "remain",
		value: 97.4,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210104",
		type: "done",
		value: 67,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210104",
		type: "remain",
		value: 33,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210105",
		type: "done",
		value: 24.7,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210105",
		type: "remain",
		value: 75.3,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210106",
		type: "done",
		value: 61.6,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210106",
		type: "remain",
		value: 38.4,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210107",
		type: "done",
		value: 13.2,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210107",
		type: "remain",
		value: 86.8,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210108",
		type: "done",
		value: 22.4,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210108",
		type: "remain",
		value: 77.6,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210109",
		type: "done",
		value: 65.7,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210109",
		type: "remain",
		value: 34.3,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210110",
		type: "done",
		value: 73,
	},
	{
		indexCode: "login_intention_rate",
		timeDate: "20210110",
		type: "remain",
		value: 27,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210101",
		type: "done",
		value: 6.2,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210101",
		type: "remain",
		value: 93.8,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210102",
		type: "done",
		value: 44.1,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210102",
		type: "remain",
		value: 55.9,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210103",
		type: "done",
		value: 2.6,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210103",
		type: "remain",
		value: 97.4,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210104",
		type: "done",
		value: 67,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210104",
		type: "remain",
		value: 33,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210105",
		type: "done",
		value: 24.7,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210105",
		type: "remain",
		value: 75.3,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210106",
		type: "done",
		value: 61.6,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210106",
		type: "remain",
		value: 38.4,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210107",
		type: "done",
		value: 13.2,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210107",
		type: "remain",
		value: 86.8,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210108",
		type: "done",
		value: 22.4,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210108",
		type: "remain",
		value: 77.6,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210109",
		type: "done",
		value: 65.7,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210109",
		type: "remain",
		value: 34.3,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210110",
		type: "done",
		value: 73,
	},
	{
		indexCode: "reg_intention_rate",
		timeDate: "20210110",
		type: "remain",
		value: 27,
	},
];

describe('components-Chart', () => {

  test('数据不变则不更新图表', async () => {
    let chart = null;
    render(<TrendFacetChart  indexNameColorMap={myIndexNameColorMap} typeNameMap={myTypeNameMap} onGetG2Instance={c => chart = c} />);
    
  })
})

import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const monthNameMap = {
  Jan: '一月',
  Feb: '二月',
  Mar: '三月',
  Apr: '四月',
  May: '五月',
  Jun: '六月',
  Jul: '七月',
  Aug: '八月',
  Sep: '九月',
  Oct: '十月',
  Nov: '十一月',
  Dec: '十二月'
}

const data = [
{ month: 'Jan', 今日: 7.0, 昨日: 3.9 },
{ month: 'Feb', 今日: 6.9, 昨日: 4.2 },
{ month: 'Mar', 今日: 9.5, 昨日: 5.7 },
{ month: 'Apr', 今日: 14.5, 昨日: 8.5 },
{ month: 'May', 今日: 18.4, 昨日: 11.9 },
{ month: 'Jun', 今日: 21.5, 昨日: 15.2 },
{ month: 'Jul', 今日: 25.2, 昨日: 17.0 },
{ month: 'Aug', 今日: 26.5, 昨日: 16.6 },
{ month: 'Sep', 今日: 23.3, 昨日: 14.2 },
{ month: 'Oct', 今日: 18.3, 昨日: 10.3 },
{ month: 'Nov', 今日: 13.9, 昨日: 6.6 },
{ month: 'Dec', 今日: 9.6, 昨日: 4.8 }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: [ '今日', '昨日' ], // 展开字段集
  key: 'daily', // key字段
  value: 'temperature', // value字段
});
const cols = {
  month: {
    range: [ 0, 1 ]
  }
}

const formatter = ['month*temperature*daily', (month, temperature, daily) => {
  return {
    title: monthNameMap[month],
    value: `${temperature}℃`,
    name: daily
  }
}]

export default class Series extends Component {
  render() {
    return (
      <Chart height={400} data={dv} scale={cols} forceFit>
        <Axis name="month" />
        <Axis name="temperature" label={{formatter: val => `${val}°C`}}/>
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="line" position="month*temperature" size={2} color={'daily'} tooltip={formatter} />
        <Geom type='point' position="month*temperature" size={4} shape={'circle'} tooltip={formatter} color={'daily'} style={{ stroke: '#fff', lineWidth: 1}} />
      </Chart>
    );
  }
}

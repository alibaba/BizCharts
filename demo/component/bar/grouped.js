import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { label: 'Monday', series1: 2800, series2: 2260 },
  { label: 'Tuesday', series1: 1800, series2: 1300 },
  { label: 'Wednesday', series1: 950, series2: 900 },
  { label: 'Thursday', series1: 500, series2: 390 },
  { label: 'Friday', series1: 170, series2: 100 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: [ 'series1', 'series2' ], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});

export default class IntervalC extends Component {
  
  render() {
    return (
      <Chart height={400} data={dv} forceFit>
        <Coord transpose scale={[1,-1]}/>
        <Axis name="label" label={{offset: 12}} />
        <Axis name="value" position={'right'} />
        <Tooltip />
        <Geom type="interval" position="label*value" color={'type'} adjust={[{
        type: 'dodge',
        marginRatio: 1 / 32
      }]}/>
      </Chart>
    );
  }
}

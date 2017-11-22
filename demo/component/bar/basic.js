import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
  { country: '中国', population: 131744 },
  { country: '印度', population: 104970 },
  { country: '美国', population: 29034 },
  { country: '印尼', population: 23489 },
  { country: '巴西', population: 18203 }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.source(data)
.transform({
  type: 'sort',
  callback(a, b) { // 排序依据，和原生js的排序callback一致
    return a.population - b.population > 0;
  }
});


export default class IntervalC extends Component {
  
  render() {
    return (
      <Chart height={400} data={dv} forceFit>
        <Coord transpose />
        <Axis name="country" label={{offset: 12}} />
        <Axis name="population" />
        <Tooltip />
        <Geom type="interval" position="country*population" />
      </Chart>
    );
  }
}

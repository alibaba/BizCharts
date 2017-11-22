import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { month: 'Jan', value: 51 },
  { month: 'Feb', value: 91 },
  { month: 'Mar', value: 34 },
  { month: 'Apr', value: 47 },
  { month: 'May', value: 63 },
  { month: 'June', value: 58 },
  { month: 'July', value: 56 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 99 },
  { month: 'Oct', value: 106 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 56 }
];
const cols = {
  month: {
    range: [ 0, 1 ]
  }
}

export default class Step extends Component {
  render() {
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="month" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="line" position="month*value" size={2} shape={'hv'} />
      </Chart>
    );
  }
}
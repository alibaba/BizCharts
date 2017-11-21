import React,  { Component } from 'react';
import BizCharts from 'bizcharts';

const { Chart, Axis, Geom, Tooltip } = BizCharts;


export default class BasicLineChart extends Component {
  
  render() {
    return (
      <Chart height={400} />
    );
  }
}

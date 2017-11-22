import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';



export default class BasicLineChart extends Component {
  
  render() {
    return (
      <Chart height={400} />
    );
  }
}

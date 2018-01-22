import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text, Html, Arc, Line } = Guide;
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const cols = {
  'sales': {tickInterval: 20},
};
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
      rotate: Math.random() * 360,
      scale: [Math.random() *0.5+0.5,Math.random() *0.5+0.5],
      reflect:'x',
      innerRadius: Math.random(),
      radius: Math.random(),
      startAngle:Math.random()-1 * Math.PI,
      endAngle:Math.random() * Math.PI
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        rotate: Math.random() * 360,
        scale: [Math.random() *0.5+0.5,Math.random() *0.5+0.5],
        reflect:this.state.reflect='x'? 'y':'x',
        innerRadius: Math.random(),
        radius: Math.random(),
        startAngle:Math.random()-1 * Math.PI,
        endAngle:Math.random() * Math.PI
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
      <Coord 
      type="polar"
      rotate={this.state.rotate}
      scale ={this.state.scale}
      reflect={this.state.reflect}
      startAngle={this.state.startAngle}
      endAngle={this.state.endAngle}
      innerRadius={this.state.innerRadius}
      radius={this.state.radius} 
      />
      <Axis name="year" />
      <Axis name="value" />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="interval" position="year*sales" />
    </Chart>
    );
  }
}
import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text, Html, Arc, Line } = Guide;
const data1 = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const data2 = [
  { year: '1951 年', sales: 28 },
  { year: '1952 年', sales: 62 },
  { year: '1956 年', sales: 31 },
  { year: '1957 年', sales: 105 },
  { year: '1958 年', sales: 148 },
  { year: '1959 年', sales: 8 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 98 },
];
const cols = {
  'sales': {tickInterval: 20},
};
const type = ['rect','helix','polar','theta']
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
        data: data1,
        type: 'rect'
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.state.data == data1 ? data2 : data1,
        type: type[Math.floor(Math.random()*5)]
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={this.state.data} scale={cols} forceFit>
      <Coord
      type={this.state.type}
      />
      <Axis name="year" />
      <Axis name="value" />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="interval" position="year*sales" />
    </Chart>
    );
  }
}

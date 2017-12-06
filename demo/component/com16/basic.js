import React,  { Component } from 'react';
import { Com16 } from 'bizcharts';

const { Chart, Geom, Legend, Tooltip, Axis } = Com16;

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

const scale = {
  'value': { min: 0 },
  'year': {range: [ 0 , 1] }
};

export default class BasicLineChart extends Component {
  
  render() {
    return (
      <Chart height={400} width={600} data={data} forceFit scale={scale}>
        <Legend />
        <Tooltip />
        <Axis />
        <Geom type="line" data={data} position={'year*value'}/>
      </Chart>
    );
  }
}

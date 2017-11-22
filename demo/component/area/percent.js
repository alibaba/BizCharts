import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;

const data = [
  {country: 'Asia', year: '1750', value: 502},
  {country: 'Asia', year: '1800', value: 635},
  {country: 'Asia', year: '1850', value: 809},
  {country: 'Asia', year: '1900', value: 947},
  {country: 'Asia', year: '1950', value: 1402},
  {country: 'Asia', year: '1999', value: 3634},
  {country: 'Asia', year: '2050', value: 5268},
  {country: 'Africa', year: '1750', value: 106},
  {country: 'Africa', year: '1800', value: 107},
  {country: 'Africa', year: '1850', value: 111},
  {country: 'Africa', year: '1900', value: 133},
  {country: 'Africa', year: '1950', value: 221},
  {country: 'Africa', year: '1999', value: 767},
  {country: 'Africa', year: '2050', value: 1766},
  {country: 'Europe', year: '1750', value: 163},
  {country: 'Europe', year: '1800', value: 203},
  {country: 'Europe', year: '1850', value: 276},
  {country: 'Europe', year: '1900', value: 408},
  {country: 'Europe', year: '1950', value: 547},
  {country: 'Europe', year: '1999', value: 729},
  {country: 'Europe', year: '2050', value: 628}
];

const dv = new DataView().source(data);
  dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'country',
  groupBy: [ 'year' ],
  as: 'percent'
});
const cols = {
  year: {
  type: 'linear',
  tickInterval: 50
  },
  'percent': {
  formatter: function(value) {
    value = value || 0;
    value = value * 100;
    return parseInt(value);
  },
  alias: 'percent(%)'
  }
}

export default class Percent extends Component {
  
  render() {
    return (
      <Chart height={600} data={dv} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="percent" />
        <Legend />
        <Tooltip crosshairs={{type:'line'}}/>
        <Geom type="areaStack" position="year*percent" color='country' />
        <Geom type="lineStack" position="year*percent" size={2} color='country' />
      </Chart>
    );
  }
}

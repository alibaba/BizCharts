import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/gaussion-distribution.json'


const { DataView } = DataSet;
const { Image } = Guide;
const ds = new DataSet({
  state: {
      sizeEncoding: false
  }
});
const dv = ds.createView('diamond').source(data);
dv.transform({
  sizeByCount: '$state.sizeEncoding', // calculate bin size by binning count
  type: 'bin.rectangle',
  fields: [ 'x', 'y' ], // 对应坐标轴上的一个点
  bins: [ 20, 10 ]
});

export default class HeatmapC extends Component {
  
  render() {
    return (
      <Chart height={window.innerHeight} data={dv} forceFit>
        <Axis name="x" grid={{
            lineStyle: {
                stroke: '#d9d9d9',
                lineWidth: 1,
                lineDash: [ 2, 2 ]
            }
        }} />
        <Legend offset={40} />
        <Axis name="stockRange" visible={false} />
        <Geom type='polygon' position="x*y" color={['count', [ 'rgb(200, 200, 255)', 'rgb(0, 0, 255)' ]]} />
      </Chart>
    );
  }
}

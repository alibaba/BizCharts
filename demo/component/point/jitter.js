import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/dv-grades.json'


export default class PointC extends Component {
  
  render() {
    return (
      <Chart height={window.innerHeight} data={data} forceFit>
        <Tooltip crosshairs={{type:'cross'}} />
        <Axis name='Score' grid={null} />
        <Axis name='Class' tickLine={null} subTickCount={1} subTickLine={{
            lineWidth: 1,
            stroke: '#BFBFBF',
            length: 4
          }}
          grid={{
            align: 'center', // 网格顶点从两个刻度中间开始
            lineStyle: {
              stroke: '#E9E9E9',
              lineWidth: 1,
              lineDash: [ 3, 3 ]
            }
          }}
        />
        <Legend reversed />
        <Geom type='point' position="Class*Score" color='Grade' opacity={0.65} shape="circle" size={4} adjust='jitter' />
      </Chart>
    );
  }
}

import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/heatmap.json'


const { DataView } = DataSet;
const { Image } = Guide;

export default class HeatmapC extends Component {
  
  render() {
    return (
      <Chart height={window.innerHeight} padding={[ 0, 30, 60, 30 ]} data={data} forceFit>
        <Tooltip showTitle={false}/>
        <Legend offset={10} />
        <Geom type='heatmap' position="g*l" color={['tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
        <Guide >
          <Image start={[ 'min', 'max' ]} end={[ 'max', 'min' ]} src='https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png' />  
        </Guide>
      </Chart>
    );
  }
}

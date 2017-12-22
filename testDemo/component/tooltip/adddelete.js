
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
  'sales': {tickInterval: 20,'alias':"请显示我！！！"},
};
const typeAry=['point','path','line','area','interval','polygon','edge','schema','heatmap'];
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
        data: data1,
        position: 'bottom',
        typeAry:'line',
        boolean: true
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.state.data == data1 ? data2 : data1,
        typeAry:typeAry[Math.floor(Math.random()*9)]
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={this.state.data} scale={cols} forceFit>
      <Axis name="year"
      />
      <Axis name="sales"
      />
       {this.state.typeAry==='path' && <Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'y',
        style: {
          lineWidth:10,
          fill:'#999',
          stroke:'#000',
          }
      }}/>}
       {this.state.typeAry==='line' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'cross',
        style: {
          lineWidth:10,
          fill:'#ddd',
          stroke:'#ccc',
          }
      }}/>}
       {this.state.typeAry==='area' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'y',
        style: {
          lineWidth:10,
          fill:'#ddd',
          stroke:'#ccc',
          }
      }}/>}
       {this.state.typeAry==='polygon' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'x',
        style: {
          lineWidth:5,
          fill:'#ddd',
          stroke:'#ccc',
          }
      }}/>}
       {this.state.typeAry==='polygon' && <Tooltip />}
       {this.state.typeAry==='edge' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'rect',
        style: {
          lineWidth:10,
          fill:'#ddd',
          stroke:'#ccc',
          }
      }}/>}
       {this.state.typeAry==='schema' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'cross',
        style: {
          lineWidth:10,
          fill:'#ddd',
          stroke:'#ccc',
          }
      }}/>}
       {this.state.typeAry==='schema' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'cross',
      }}/>}
       {this.state.typeAry==='heatmap' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'y',
      }}/>}
       {this.state.typeAry==='interval' &&<Tooltip crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'x',
      }}/>}
       {this.state.typeAry==='interval' &&<Tooltip       crosshairs={{
        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
        type: 'rect',
      }}/>}
       <Geom type="interval" position="year*sales" color="sales"/>
    </Chart>
    );
  }
}

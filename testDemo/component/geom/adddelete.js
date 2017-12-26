
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
      <Axis
      />
      <Axis name="sales"
      />
       {this.state.typeAry==='path' &&<Geom type="path" position="year*sales" color="green" />}
       {this.state.typeAry==='line' &&<Geom type="line" position="year*sales" color="red"/>}
       {this.state.typeAry==='area' &&<Geom type="area" position="year*sales" color="pink"/>}
       {this.state.typeAry==='polygon' &&<Geom type="area" position="year*sales" color="yelow"/>}
       {this.state.typeAry==='polygon' &&<Geom type="interval" position="year*sales" color="yelow"/>}
       {this.state.typeAry==='edge' &&<Geom type="edge" position="year*sales" />}
       {this.state.typeAry==='schema' &&<Geom type="area" position="year*sales" color="#aacc00" />}
       {this.state.typeAry==='schema' &&<Geom type="point" position="year*sales" color="#aacc00" />}
       {this.state.typeAry==='heatmap' &&<Geom type="area" position="year*sales" />}
       {this.state.typeAry==='interval' &&<Geom type="interval" position="year*sales" />}
       {this.state.typeAry==='interval' &&<Geom type="line" position="year*sales" />}
       {this.state.typeAry==='point' &&<Geom type="point" position="year*sales" size='sales'/>}


    </Chart>
    );
  }
}

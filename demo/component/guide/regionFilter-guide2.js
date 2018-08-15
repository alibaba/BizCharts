import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { RegionFilter, DataMarker, Text } = Guide;

const data = [{
  year: 1700,
  exports: 35,
  imports: 70
}, {
  year: 1710,
  exports: 59,
  imports: 81
}, {
  year: 1720,
  exports: 76,
  imports: 96
}, {
  year: 1730,
  exports: 65,
  imports: 97
}, {
  year: 1740,
  exports: 67,
  imports: 93
}, {
  year: 1750,
  exports: 79,
  imports: 90
}, {
  year: 1760,
  exports: 115,
  imports: 79
}, {
  year: 1770,
  exports: 163,
  imports: 85
}, {
  year: 1780,
  exports: 185,
  imports: 93
}];


const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'map',
  callback: function callback(row) {
    row.range = [row.exports, row.imports];
    return row;
  }
});
dv.transform({
  type: 'fold',
  fields: ['exports', 'imports'], // 展开字段集
  key: 'type', // key字段
  value: 'value' // value字段
});

const scale = {
  value: {
    min: 0,
    max: 200
  },
  range: {
    min: 0,
    max: 200
  }
};

export default class RegionFilter2 extends Component {
  render() {
    return (
      <Chart height={400} data={dv} scale={scale} forceFit>
        <Axis name="range" visible={false} />
        <Axis name="value" />
        <Tooltip corsshairs={{type: 'line'}}/>
        <Geom type="line" position="year*value"
        color={['type', ['#F5222D', '#FAAD14']]}
        size={2.5}
        shape='smooth'
        />
        <Geom type="area" position="year*range"
        color='#ffffff'
        tooltip={false}
        shape='smooth'
        />
        <Guide>
          <RegionFilter top={true} start={[1700, 'min']} end={[1753, 'max']}
          color='#F5222D'
          apply={['area']}
          />
          <RegionFilter top={true} start={[1753, 'min']} end={[1780, 'max']}
          color='#FAAD14'
          apply={['area']}
          />
          <DataMarker
          position={[1753, 87]}
          content={'1755 年在印度周边建立诸多殖民\n地与附属国，垄断出口贸易，导致\n出品总额激增。'}
          lineLength={50}
          direction='downward'
          style={{
            text: {
              textAlign: 'left',
              fontSize: 13
            },
            point: {
              stroke: '#FF4D4F'
            }
          }}
          />
          <Text top={false} position={[1730, 80]} content='贸易赤字'
          style={{
            fontSize: 14,
            fill: '#666666',
            opacity: 0.8
          }}
          />
          <Text top={false} position={[1765, 110]} content='贸易盈余'
          style={{
            fontSize: 14,
            fill: '#666666',
            opacity: 0.8
          }}
          />
        </Guide>
      </Chart>
    );
  }
}

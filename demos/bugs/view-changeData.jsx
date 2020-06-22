import React from 'react';
import DataSet from '@antv/data-set';
import {
  Chart,
  Point,
  Line,
  Tooltip,
  Coordinate,
  Interval,
  View,
  Legend,
  Axis,
  Interaction,
} from '../../src';

const data = [
  { item: 'Design', a: 70 },
  { item: 'Development', a: 70 },
  { item: 'Marketing', a: 70 },
  { item: 'Users', a: 70 },
  { item: 'Test', a: 60 },
  { item: 'Language', a: 70 },
];
const { DataView } = DataSet;
const dv = new DataView().source(data);
dv.transform({
  type: 'fold',
  fields: ['a'], // 展开字段集
  key: 'user', // key字段
  value: 'score', // value字段
});

const data2 = [
  { value: 2, type: '易学性' },
  { value: 5, type: '易用性' },
  { value: 3, type: '高效性' },
];

export default class RadarChart extends React.Component {
  render() {
    return (
      <div>
      <Chart
        height={600}
        data={dv.rows}
        autoFit
        scale={{
          score: {
            min: 0,
            max: 80,
          }
        }}
        interactions={['legend-highlight']}
      >
        <Coordinate type="polar" radius={0.5} />
        <Tooltip shared />
        <Point
          position="item*score"
          color="user"
          shape="circle"
        />
        <Axis name="score" />
        <Axis name="item" visible={false}/>
        <Line
          position="item*score"
          color="user"
          size="2"
        />
        <Legend visible={false} />
        <View data={data2} height={500} autoFit >
          <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
          <Axis visible={false} />
          <Tooltip showTitle={false} />
          <Interval
            adjust="stack"
            position="value"
            color={['type', ['#428DFF', '#28BBDF', '#3FD9B0']]}
            shape="sliceShape"
            label={['type', {
              offset: -15,
            }]}
          />
          <Interaction type="element-single-selected" />
        </View>
      </Chart>
      <div onClick={() => { this.forceUpdate()}}>click  me</div>
      </div>
    );
  }
}

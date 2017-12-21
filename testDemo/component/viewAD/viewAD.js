import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;

const data = [
  { value: 251, type: '大事例一', name: '子事例一' },
  { value: 1048, type: '大事例一', name: '子事例二' },
  { value: 610, type: '大事例二', name: '子事例三' },
  { value: 434, type: '大事例二', name: '子事例四' },
  { value: 335, type: '大事例三', name: '子事例五' },
  { value: 250, type: '大事例三', name: '子事例六' }
];

const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent'
});
const cols = {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  }
}  
const dv1 = new DataView();
dv1.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});

export default class PieC extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showViewVal: Math.floor(Math.random() * 10),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        showViewVal: Math.floor(Math.random() * 10),
      });
    }, 1000);
  }
  
  render() {
    return (
  <Chart height={400} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
    <Coord type='theta' radius={0.5} />
    <Geom
      type="intervalStack"
      position="percent"
      color='type'
      style={{lineWidth: 1,stroke: '#fff'}}
      select={false}
      >
    </Geom>
    {
      this.state.showViewVal < 4 && 
      <View data={dv1} scale={cols} >
        <Coord type='theta' radius={0.75} innerRadius={0.5 / 0.75}/>
        <Geom
          type="intervalStack"
          position="percent"
          color={['name', [ '#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4' ]]}
          tooltip={['name*percent',(item, percent) => {
            percent = (percent * 100).toFixed(2) + '%';
            return {
              name: item,
              value: percent
            };
          }]}
          style={{lineWidth: this.state.lineWidth, stroke: '#fff'}}
          select={false}
        />
      </View>
    }
    {
      this.state.showViewVal >= 4 &&  this.state.showViewVal <=6 &&
      <View data={dv1} scale={cols} >
        <Geom
          type="intervalStack"
          position="percent"
          color={['name', [ '#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4' ]]}
          tooltip={['name*percent',(item, percent) => {
            percent = (percent * 100).toFixed(2) + '%';
            return {
              name: item,
              value: percent
            };
          }]}
          style={{lineWidth: this.state.lineWidth, stroke: '#fff'}}
          select={false}
        />
      </View>
    }
    {
      this.state.showViewVal > 6 &&
      <View data={data} scale={cols} >
        <Coord type='rect' />
        <Axis />
        <Geom
          type="line"
          position="name*value"
          style={{lineWidth: this.state.lineWidth,}}
          select={false}
        />
      </View>
    }
  </Chart>
    );
  }
}

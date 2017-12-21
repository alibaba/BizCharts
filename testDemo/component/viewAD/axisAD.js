import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import { setTimeout } from 'timers';


const data = [
  { label: 'Monday', series1: 2800, series2: 2260 },
  { label: 'Tuesday', series1: 1800, series2: 1300 },
  { label: 'Wednesday', series1: 950, series2: 900 },
  { label: 'Thursday', series1: 500, series2: 390 },
  { label: 'Friday', series1: 170, series2: 100 },
];

export default class IntervalC extends Component {
  constructor() {
    super();
    this.state = {
      val: Math.random() * 10,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        val: Math.random() * 10,
      });
    }, 1000);
  }
  
  render() {
    return (
      <Chart height={400} data={data} padding={80} forceFit>
        <View data={data}>
          <Coord transpose scale={[1,-1]}/>
          {
            this.state.val < 4 && <Axis name="label" label={{offset: 12}} />
          }
          {
            this.state.val > 2 && this.state.val < 7 && <Axis name="series1" position={'left'} />
          }
          {
            this.state.val > 6 && this.state.val < 11 && <Axis name="series2" position={'right'} />
          }
          <Tooltip />
          <Geom type="interval" position="label*series1" color={'label'} />
          <Geom type="area" position="label*series2" color="#ff0000"/>
        </View>
        <View data={data}>
          <Coord />
          {
            this.state.val < 6 && <Axis name="label" label={{offset: 12}} />
          }
          {
            this.state.val > 3 && this.state.val < 8 && <Axis name="series1" position={'left'} />
          }
          {
            this.state.val > 5 && this.state.val < 20 && <Axis name="series2" position={'right'} />
          }
          <Tooltip />
          <Geom type="line" position="label*series1" />
          <Geom type="line" position="label*series2" color="#ff0000"/>
        </View>
      </Chart>
    );
  }
}

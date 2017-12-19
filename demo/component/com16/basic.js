import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';

const GuideLine = Guide.Line;

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

const scale = {
  'value': { min: 0 },
  'year': {range: [ 0 , 1] }
};

export default class BasicLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAxis: true,
      tooltipType: 'y',
      scale: [1, 1],
      type: 'polar',
      position: 'top',
      name: 'year',
      size:30,
      color: "#ff0000",
      height: 400,
      padding: 10,
    }
  }

  componentDidMount() {
    setTimeout((() => {
      this.setState({
        showAxis: false,
        tooltipType: 'cross',
        scale: [0.7, 0.7],
        type: 'rect',
        position: 'bottom',
        name: 'value',
        size:50,
        color: "#00ff00",
        height: 800,
        padding: 300,
      });
    }).bind(this), 2000);
  }
  
  render() {
    return (
      <Chart height={this.state.height} data={data} scale={scale} padding={this.state.padding} forceFit>
        {
          this.state.showAxis ? <Axis name="year" visible={ this.state.showAxis }/> : null
        }
        
        {/*
          this.state.showAxis ? <Coord type={this.state.type} scale={this.state.scale}/> : null
        */}
        <Legend name='value' position={this.state.position}/>
        {
          this.state.showAxis ? <Legend name='year' position={this.state.position}/> : null
        }
        <Axis name="value" />
        <Tooltip crosshairs={{type : this.state.tooltipType}}/>
        {
          <Geom type="line" position="year*value" size={2} />
        }
        <Geom type='interval' position="year*value" size={this.state.size} color={this.state.name} style={{ stroke: '#fff'}}>
          {
            this.state.showAxis ? null : <Label content={this.state.name} />
          }
        </Geom>
        <Guide>
          {
            !this.state.showAxis ? null : <GuideLine start={{year: '1993', value: 9}} end={{year: '1998', value: 9}} lineStyle={{stroke: this.state.color}}/>
          }
          <GuideLine start={{year: '1993', value: 5}} end={{year: '1998', value: 10}} lineStyle={{stroke: this.state.color}}/>
        </Guide>
      </Chart>
    );
  }
}

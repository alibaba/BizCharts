import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text, Html, Arc, Line } = Guide;
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const cols = {
  'sales': {tickInterval: 20},
};

const type = ['rect','helix','polar','theta']

export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
      rotate: Math.random() * 360,
      scale: [Math.random() *0.5+0.5,Math.random() *0.5+0.5],
      reflect:'x',
      innerRadius: Math.random(),
      radius: Math.random(),
      startAngle:Math.random()-1 * Math.PI,
      endAngle:Math.random() * Math.PI
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        rotate: Math.random() * 360,
        scale: [Math.random() *0.5+0.5,Math.random() *0.5+0.5],
        reflect:this.state.reflect='x'? 'y':'x',
        innerRadius: Math.random(),
        radius: Math.random(),
        startAngle:Math.random()-1 * Math.PI,
        endAngle:Math.random() * Math.PI,
        type: type[Math.floor(Math.random()*5)]
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={800} data={data} scale={cols} forceFit>
      <View 
        data={data}
        scale={cols}
        start={{x:0, y:0}}
        end={{x:0.5, y:0.5}}
      >
        <Coord
          type="polar"
          rotate={this.state.rotate}
          scale ={this.state.scale}
          reflect={this.state.reflect}
          startAngle={this.state.startAngle}
          endAngle={this.state.endAngle}
          innerRadius={this.state.innerRadius}
          radius={this.state.radius} 
        />
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="interval" position="year*sales" />
      </View>

      <View 
        data={data}
        scale={cols}
        start={{x:0.5, y:0}}
        end={{x:1, y:0.5}}
      >
        <Coord 
        type="rect"
        rotate={this.state.rotate}
        scale ={this.state.scale}
        reflect={this.state.reflect}
        />
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="interval" position="year*sales" />
      </View>
      <View 
        data={data}
        scale={cols}
        start={{x:0, y:0.5}}
        end={{x:0.5, y:1}}
      >    
        <Coord 
          type="helix"
          rotate={this.state.rotate}
          scale ={this.state.scale}
          reflect={this.state.reflect}
          startAngle={this.state.startAngle}
          endAngle={this.state.endAngle}
          innerRadius={this.state.innerRadius}
          radius={this.state.radius} 
          />
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="interval" position="year*sales" />
      </View>
      <View 
        data={data}
        scale={cols}
        start={{x:0.5, y:0.5}}
        end={{x:1, y:1}}
        >        
        <Coord 
          type="theta"
          rotate={this.state.rotate}
          scale ={this.state.scale}
          reflect={this.state.reflect}
          startAngle={this.state.startAngle}
          endAngle={this.state.endAngle}
          innerRadius={this.state.innerRadius}
          radius={this.state.radius} 
        />
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="interval" position="year*sales" />
      </View>
      <View 
        data={data}
        scale={cols}
        start={{x:0.3, y:0.3}}
        end={{x:0.8, y:0.8}}
        >
        <Coord
        type={this.state.type}
        />
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="interval" position="year*sales" />
      </View>
    </Chart>
    );
  }
}
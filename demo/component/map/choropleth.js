import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import mapData from '../../data/world.geo.json';
import DataSet from '@antv/data-set';


const cols = {
  longitude: {
    sync: true,
    range:[0, 1]
  },
  latitude: {
    sync: true,
    range: [0, 1]
  },
}

const ds = new DataSet();
const worldMap = ds.createView('back')
  .source(mapData, {
    type: 'GeoJSON'
  });
    // 可视化用户数据
const userData = [
  {name: 'Russia',value: 86.8},
  {name: 'China',value: 106.3},
  {name: 'Japan',value: 94.7},
  {name: 'Mongolia',value: 98},
  {name: 'Canada',value: 98.4},
  {name: 'United Kingdom',value: 97.2},
  {name: 'United States of America',value: 98.3},
  {name: 'Brazil',value: 96.7},
  {name: 'Argentina',value: 95.8},
  {name: 'Algeria',value: 101.3},
  {name: 'France',value: 94.8},
  {name: 'Germany',value: 96.6},
  {name: 'Ukraine',value: 86.3},
  {name: 'Egypt',value: 102.1},
  {name: 'South Africa',value: 101.3},
  {name: 'India',value: 107.6},
  {name: 'Australia',value: 99.9},
  {name: 'Saudi Arabia',value:130.1},
  {name: 'Afghanistan',value: 106.5},
  {name: 'Kazakhstan',value:93.4},
  {name: 'Indonesia',value: 101.4}
];
const userDv = ds.createView()
.source(userData)
.transform({
  geoDataView: worldMap,
  field: 'name',
  type: 'geo.region',
  as: [ 'longitude', 'latitude' ]
})
.transform({
  type: 'map',
  callback: function(obj) {
    obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
    return obj;
  }
});


const xRange = worldMap.range('longitude');
const yRange = worldMap.range('latitude');
  
const ratio = (xRange[1] - xRange[0]) / (yRange[1] - yRange[0]);          
const h = window.innerHeight;
const w = h * ratio;
  

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      width: 1200,
      height: (1200 - 80)/ratio,
      cols: {
        longitude: {
          sync: true,
          range:[0, 1]
        },
        latitude: {
          sync: true,
          range: [0, 1]
        }
      }
    };
  }
  
  componentDidMount() {
    const self = this;
    window.onresize=function() {
      const nw = 600;
      const nh = (nw - 80) / ratio;
      // 80 是 左边的 padding
      self.setState({
        width: nw,
        height: nh
      })
      console.log('xxxxx')
    }

    var e = new Event("resize");
    window.dispatchEvent(e);
  }

  render() {
    return <Chart height={this.state.height}  width={this.state.width} scale={this.state.cols} padding={[0, 0, 0, 80]}>
        <Tooltip showTitle={false} />
        <Legend name='trend' position='left' />
        <View data={worldMap} >
          <Geom type='polygon' tooltip={false} position='longitude*latitude' style={{fill: '#fff',stroke: '#ccc',lineWidth: 1}}/>
        </View>
        <View data={userDv} scale={{
          'trend': {
            alias: '每100位女性对应的男性数量'
          }
        }} >
          <Geom type='polygon' position='longitude*latitude' animate={{leave: {animation: 'fadeOut'}}} opacity='value' tooltip='name*trend' color={['trend', [ '#C45A5A', '#14647D' ]]} size={0}>
            <Label content='name' offset={0} textStyle={{fill: '#545454',fontSize: 10}}/>
        </Geom>
        </View>
      <Geom type='polygon' position="x*y" style={{lineWidth: 1,stroke: '#fff'}} color={['count', [ 'rgb(200, 200, 255)', 'rgb(0, 0, 255)' ]]} />
    </Chart> 
  }
}

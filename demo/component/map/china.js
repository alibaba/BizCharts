import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import data from '../../data/china-geo.json';
import DataSet from '@antv/data-set';

const cols = {
  x: { sync: true, nice: false },
  y: { sync: true, nice: false }
}

const { features } = data;
const userData = [];
for(let i=0; i<features.length; i++) {
  const name = features[i].properties.name;
  userData.push({
      name,
      value: Math.round(Math.random()*1000)
  });
}
// data set
const ds = new DataSet();
// geo data
const dvGeo = ds.createView().source(data, {
  type: 'GeoJSON'
});
// user data
const dvData = ds.createView().source(userData);
// assign centroid point (x, y) to user data
dvData.transform({
  type: 'geo.centroid',
  field: 'name',
  geoDataView: dvGeo,
  as: ['x', 'y']
});
dvGeo.transform({
  type: 'rename',
  map: {
    longitude: 'x',
    latitude: 'y',
  }
});

export default class ChinaChart extends Component {
  
  render() {
    return (
      <Chart data={[1]} height={window.innerHeight} scale={cols} padding={[40, 90]} forceFit>
        <View data={dvGeo} >
          <Geom type='polygon' position='x*y' style={{stroke: '#ddd',lineWidth: 0.5}}/>
        </View>
        <View data={dvData} >
          <Geom type='point' position='x*y' size={20}>
            <Label content='name' offset={0} textStyle={{fill: '#545454',fontSize: 10}}/>
          </Geom>
        </View>
      </Chart>
    );
  }
}

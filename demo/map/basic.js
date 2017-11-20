# 中国地图

---

# 中国地图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Source from '@ali/datavis-source@0.0.18/dist/index.js';
import { Chart, Coord, Geom, Stat,Label } from '@ali/bizcharts';
import DataSet from '@antv/data-set';



const data = Source.MapData.China;
let userData = [];
const features = data.features;
for(var i=0; i<features.length; i++) {
  var name = features[i].properties.name;
  userData.push({
    "name": name,
    "value": Math.round(Math.random()*1000)
  });
}

const ds = new DataSet();
const geoDv = ds.createView().source(data, {
    type: 'GeoJSON', 
})
const dv = ds.createView().source(userData)
dv.transform({
    type: 'geo.region',
    field: 'name',                     
    geoDataView: geoDv,        
    as:[ '_x', '_y' ]
})

ReactDOM.render((
  <Chart height={400} data={dv} forceFit>
    <Geom type="polygon" position="_x*_y" color={['value', '#F4EC91-#AF303C']}>
      <Label label="name" style={{stroke: '#333', lineWidth: 1}}/>
    </Geom>
  </Chart>
), document.getElementById('mountNode'));
````
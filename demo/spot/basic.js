# 气泡图

---

# 气泡图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Source from '@ali/datavis-source@0.0.18/dist/index.js';
import { Chart, Geom, Axis, Tooltip, Legend } from '@ali/bizcharts';

const data = Source.SampleData.D2;

const cols = {
 'LifeExpectancy': { alias: '人均寿命（年）' },
 'Population': { type: 'pow', alias: '人口总数' },
 'GDP': { alias: '人均国内生产总值($)' },
 'Country': { alias: '国家/地区' }
};

ReactDOM.render((
  <Chart width={600} height={400} data={data} cols={cols}>
    <Axis 
      name="GDP"
      formatter={(value) => {
      	return (value / 1000).toFixed(0) + 'k';
    	}}
    />
    <Legend name="Population" visible={false} />
    <Tooltip title={null} />
    <Geom 
      type="point" 
      shape="circle"
      opacity={0.65} 
      position="GDP*LifeExpectancy" 
      size={['Population', 35, 5]} 
      color="continent"
      tooltip="Country*Population*GDP*LifeExpectancy" />
  </Chart>
), document.getElementById('mountNode'));
````
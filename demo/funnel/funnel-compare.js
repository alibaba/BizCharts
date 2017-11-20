# 对比漏斗图

---

# 对比漏斗图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Coord, Tooltip, View, Label} from '@ali/bizcharts';

const expectData = [
  { value: 100, name: '展现' },
  { value: 80, name: '点击' },
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
];
const actualData = [
  { value: 80, name: '展现' },
  { value: 50, name: '点击' },
  { value: 30, name: '访问' },
  { value: 10, name: '咨询' },
  { value: 5, name: '订单' },
];

ReactDOM.render((
  <Chart height={450} width={600} data={expectData} scale={{name: { formatter: val => `预期${val}` }}} plotCfg={{ margin: [0, 80] }}>
    <Coord type="rect" transpose scale={[1, -1]} />
    <Tooltip title={null} />
    <Geom type="interval" adjust="symmetric" position="name*value" color="name" shape="funnel" opacity="0.65" >
     	<Label label='name'/>
    </Geom>
  </Chart>
), document.getElementById('mountNode'));

````
# 词云

---

# 词云

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Geom, Coord, Tooltip } from '@ali/bizcharts';
import CloudChart from '@ali/bizcharts-cloud';

const data = [
  { site: '125.88.160.114', pv: 1 }, { site: '140.205.137.163', pv: 1 }, { site: '192.168.31.247', pv: 1 }, { site: 'suso56', pv: 1 }, { site: 'fengdie-dev', pv: 1 }, { site: 'cssyz', pv: 1 }, { site: 'adart', pv: 1 }, { site: 'gxwk', pv: 1 }, { site: '192.168.0.112', pv: 1 }, { site: 'cartocar', pv: 1 }, { site: 'zhuoguo', pv: 1 }, { site: 'm', pv: 1 }, { site: 'fcdart', pv: 1 }, { site: 'adart-pre', pv: 1 }, { site: 'render', pv: 1 }, { site: 'suso', pv: 1 }, { site: 'guxi', pv: 1 }, { site: 'blog', pv: 1 }, { site: 'mspp', pv: 1 }, { site: 'antvis', pv: 2 }, { site: 'ping4g', pv: 2 }, { site: 'dcpconsole', pv: 2 }, { site: 'antp', pv: 2 }, { site: 'web-b', pv: 2 }, { site: '112.82.247.234', pv: 2 }, { site: 'wf', pv: 2 }, { site: 'seo', pv: 2 }, { site: 'sandvik', pv: 2 }, { site: '192.168.0.134', pv: 2 }, { site: 'zdataassets-d4100', pv: 2 }, { site: 'amss', pv: 3 }, { site: 'bjmiaodai', pv: 3 }, { site: '115.231.218.159', pv: 3 }, { site: 'bjzhzj', pv: 3 }, { site: 'adart', pv: 4 }, { site: 'b', pv: 4 }, { site: 'd', pv: 4 }, { site: 'titans', pv: 5 }, { site: 'live', pv: 5 }, { site: 'bjzhzj', pv: 5 }, { site: 'localhost', pv: 5 }, { site: 'zdataassets', pv: 5 }, { site: '120.77.15.178', pv: 5 }, { site: 'perf-clouddba', pv: 6 }, { site: 'linke-1', pv: 6 }, { site: 'dataeye', pv: 6 }, { site: 'bjmiaodai', pv: 6 }, { site: 'antopdaemon', pv: 6 }, { site: 'hrm', pv: 6 }, { site: 'local', pv: 6 }, { site: 'gxwl', pv: 7 }, { site: 'ecrm-binding-dashboard', pv: 7 }, { site: '192.168.0.202', pv: 7 }, { site: 'adart-1-64', pv: 7 }, { site: 'yuanheng', pv: 7 }, { site: '1.localhost', pv: 8 }, { site: 'adart', pv: 8 }, { site: '10.210.251.49', pv: 8 }, { site: '192.168.0.11', pv: 9 }, { site: 'qa', pv: 11 }, { site: '192.168.1.23', pv: 11 }, { site: 'b', pv: 11 }, { site: '192.168.1.94', pv: 12 }, { site: '192.168.1.137', pv: 12 }, { site: 'bifrost', pv: 13 }, { site: 'yzh', pv: 13 }, { site: 'ask', pv: 13 }, { site: 'adart-alarm-t3143', pv: 14 }, { site: '100.67.44.8', pv: 14 }, { site: 'demo', pv: 15 }, { site: 'antopdaemon', pv: 16 }, { site: 'cslearn', pv: 17 }, { site: 'pre', pv: 17 }, { site: 'hz', pv: 18 }, { site: 'bi', pv: 18 }, { site: 'socialmng-d4163', pv: 18 }, { site: 'fraudmng1-d4267', pv: 19 }, { site: 'loadjob', pv: 21 }, { site: 'nomo', pv: 23 }, { site: 'openmonitor-1-64', pv: 23 }, { site: 'nlo', pv: 25 }, { site: 'fraudmng', pv: 25 }, { site: 'antp', pv: 26 }, { site: 'wlkt', pv: 26 }, { site: '139.196.223.165', pv: 27 }, { site: 'monitor', pv: 28 }, { site: 'staging-app', pv: 28 }, { site: 'dbpaas', pv: 28 }, { site: 'linke', pv: 29 }, { site: 'aone-test', pv: 29 }, { site: '192.168.0.203', pv: 30 }, { site: 'manager', pv: 31 }, { site: 'filesync', pv: 33 }, { site: 'linke', pv: 34 }, { site: 'humeng', pv: 34 }, { site: 'cslearn-d3286', pv: 34 }, { site: '10.125.2.180', pv: 35 }, { site: 'ux', pv: 37 }, { site: 'ask', pv: 48 }, { site: 'wf', pv: 51 }, { site: 'muses', pv: 53 }, { site: 'linke', pv: 57 }, { site: 'mokiwi_dsp', pv: 60 }, { site: 'xrht', pv: 61 }, { site: 'w', pv: 66 }, { site: 'openmonitor', pv: 67 }, { site: 'finsandbox-d4689', pv: 69 }, { site: 'lzp', pv: 71 }, { site: 'xrht', pv: 71 }, { site: 'openmonitor-pool', pv: 74 }, { site: 'home', pv: 92 }, { site: 'gohomeplay', pv: 95 }, { site: 'hello', pv: 95 }, { site: 'w', pv: 100 }, { site: 'dart', pv: 104 }, { site: 'admin', pv: 104 }, { site: 'crm', pv: 106 }, { site: 'wf', pv: 108 }, { site: 'bjzhzj', pv: 112 }, { site: 'richard', pv: 128 }, { site: 'openmonitor-d3299', pv: 131 }, { site: 'mangoerp', pv: 139 }, { site: '172.27.119.172', pv: 153 }, { site: 'fraudmng-d4267', pv: 165 }, { site: 'app', pv: 204 }, { site: '10.17.41.198', pv: 206 }, { site: 'miaodaiwang', pv: 229 }, { site: 'dart', pv: 283 }, { site: '10.1.16.104', pv: 295 }, { site: 'perf', pv: 464 }, { site: '127.0.0.1', pv: 562 }, { site: 'dbpaas', pv: 607 }, { site: 'fraudmng', pv: 851 }, { site: 'g2', pv: 2339 }, { site: 'localhost', pv: 2750 }
];

data.sort((a, b) => b.pv - a.pv);
// 获取数据的最大值和最小值
const max = data[0].pv;
const min = data[data.length - 1].pv;
// 设定文字大小配置函数(默认为12-40px的随机大小)
const size = words => (((words.pv - min) / (max - min)) * (100 - 14)) + 14;
// 设定文字内容
const text = words => words.site;

ReactDOM.render((
  <div>
    <CloudChart width={650} height={450} data={data} plotCfg={{ margin: 0 }} text={text} size={size}>
      <Coord reflect />
      <Tooltip title={null} />
      <Geom type="point" position="x*y" color="text" size={['size', s => s]} shape="cloud" style={{ fontFamily: 'serif' }} tooltip="site*pv" />
    </CloudChart>
    <CloudChart width={650} height={450} data={data} plotCfg={{ margin: 0 }} text={text} size={size} image="//zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg">
      <Coord reflect />
      <Tooltip title={null} />
      <Geom type="point" position="x*y" color="text" size={['size', s => s]} shape="cloud" style={{ fontFamily: 'serif' }} tooltip="site*pv" />
    </CloudChart>
  </div>
), document.getElementById('mountNode'));
````
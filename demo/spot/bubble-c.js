# 自定义图片气泡图

---

# 自定义图片气泡图

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Shape } from '@ali/bizcharts';

const data = [
  { name: 'Internet Explorer', value: 26 },
  { name: 'Chrome', value: 40 },
  { name: 'Firefox', value: 30 },
  { name: 'Safari', value: 24 },
  { name: 'Opera', value: 15 },
  { name: 'Undetectable', value: 8 },
];
const imageMap = {
  'Internet Explorer': '//zos.alipayobjects.com/rmsportal/FDWrsEmamcNvtEf.png',
  Chrome: '//zos.alipayobjects.com/rmsportal/GHGrgIDTVMCaYZT.png',
  Firefox: '//zos.alipayobjects.com/rmsportal/vzhXpeDRQURIStk.png',
  Safari: '//zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png',
  Opera: '//zos.alipayobjects.com/rmsportal/RdEElDcYVXtHDRD.png',
  Undetectable: '//zos.alipayobjects.com/rmsportal/YCLAblnKOdToECl.png',
};

Shape.registShape('point', 'image', {
  drawShape(cfg, container) {
    cfg.points = this.parsePoints(cfg.points);
    container.addShape('line', {
      attrs: {
        x1: cfg.points[0].x,
        y1: cfg.points[0].y,
        x2: cfg.points[0].x,
        y2: 370,
        stroke: '#ccc',
        lineWidth: 2,
        lineDash: [4, 2],
      },
    });
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x - (12 * cfg.size / 2),
        y: cfg.points[0].y - 12 * cfg.size,
        width: 12 * cfg.size,
        height: 12 * cfg.size,
        img: cfg.shape[1],
      },
    });
  },
});
const cols = {
  value: {
    nice: false,
    max: 60,
    min: 0,
  },
};

ReactDOM.render((
  <Chart height={450} data={data} cols={cols} plotCfg={{ margin: [20, 20, 90] }} forceFit>
    <Axis name="name" />
    <Axis name="value" visible={false} />
    <Legend name="name" position="bottom" />
    <Legend name="value" visible={false} />
    <Tooltip />
    <Geom type="point" position="name*value" size="value" color="name" shape={['name', name => ['image', imageMap[name]]]} label={['value', { offset: -20, label: { fontSize: 16 } }]} />
  </Chart>
), document.getElementById('mountNode'));
````
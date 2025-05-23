# bizgoblin基础柱状图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0967f850-997a-11ea-a591-9be663db1ad5.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const data = [
  {
    year: '1951 年',
    sales: 38,
  }, {
    year: '1952 年',
    sales: 52,
  }, {
    year: '1956 年',
    sales: 61,
  }, {
    year: '1957 年',
    sales: 145,
  }, {
    year: '1958 年',
    sales: 48,
  }, {
    year: '1959 年',
    sales: 38,
  }, {
    year: '1960 年',
    sales: 38,
  }, {
    year: '1962 年',
    sales: 38,
  },
];

const defs = [{
  dataKey: 'year',
}, {
  dataKey: 'sales',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = null;
  items[0].name = items[0].title;
  items[0].value = `¥ ${items[0].value}`;
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} animate={{ type: 'scaley' }} pixelRatio={pixelRatio} >
        <Axis dataKey="year" label={{ fontSize: 8 }} />
        <Axis dataKey="sales" />
        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
        <Geom geom="interval" position="year*sales" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

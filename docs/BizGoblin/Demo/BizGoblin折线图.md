# BizGoblin折线图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/09649cf0-997a-11ea-a591-9be663db1ad5.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  {
    date: '2017-06-05',
    value: 116,
  }, {
    date: '2017-06-06',
    value: 129,
  }, {
    date: '2017-06-07',
    value: 135,
  }, {
    date: '2017-06-08',
    value: 86,
  }, {
    date: '2017-06-09',
    value: 73,
  }, {
    date: '2017-06-10',
    value: 85,
  }, {
    date: '2017-06-11',
    value: 73,
  }, {
    date: '2017-06-12',
    value: 68,
  }, {
    date: '2017-06-13',
    value: 92,
  }, {
    date: '2017-06-14',
    value: 130,
  }, {
    date: '2017-06-15',
    value: 245,
  }, {
    date: '2017-06-16',
    value: 139,
  }, {
    date: '2017-06-17',
    value: 115,
  }, {
    date: '2017-06-18',
    value: 111,
  }, {
    date: '2017-06-19',
    value: 309,
  }, {
    date: '2017-06-20',
    value: 206,
  }, {
    date: '2017-06-21',
    value: 137,
  }, {
    date: '2017-06-22',
    value: 128,
  }, {
    date: '2017-06-23',
    value: 85,
  }, {
    date: '2017-06-24',
    value: 94,
  }, {
    date: '2017-06-25',
    value: 71,
  }, {
    date: '2017-06-26',
    value: 106,
  }, {
    date: '2017-06-27',
    value: 84,
  }, {
    date: '2017-06-28',
    value: 93,
  }, {
    date: '2017-06-29',
    value: 85,
  }, {
    date: '2017-06-30',
    value: 73,
  }, {
    date: '2017-07-01',
    value: 83,
  }, {
    date: '2017-07-02',
    value: 125,
  }, {
    date: '2017-07-03',
    value: 107,
  }, {
    date: '2017-07-04',
    value: 82,
  }, {
    date: '2017-07-05',
    value: 44,
  }, {
    date: '2017-07-06',
    value: 72,
  }, {
    date: '2017-07-07',
    value: 106,
  }, {
    date: '2017-07-08',
    value: 107,
  }, {
    date: '2017-07-09',
    value: 66,
  }, {
    date: '2017-07-10',
    value: 91,
  }, {
    date: '2017-07-11',
    value: 92,
  }, {
    date: '2017-07-12',
    value: 113,
  }, {
    date: '2017-07-13',
    value: 107,
  }, {
    date: '2017-07-14',
    value: 131,
  }, {
    date: '2017-07-15',
    value: 111,
  }, {
    date: '2017-07-16',
    value: 64,
  }, {
    date: '2017-07-17',
    value: 69,
  }, {
    date: '2017-07-18',
    value: 88,
  }, {
    date: '2017-07-19',
    value: 77,
  }, {
    date: '2017-07-20',
    value: 83,
  }, {
    date: '2017-07-21',
    value: 111,
  }, {
    date: '2017-07-22',
    value: 57,
  }, {
    date: '2017-07-23',
    value: 55,
  }, {
    date: '2017-07-24',
    value: 60,
  },
];

const defs = [
  {
    dataKey: 'value',
    tickCount: 5,
    min: 0,
  },
  {
    dataKey: 'date',
    type: 'timeCat',
    range: [0, 1],
    tickCount: 3,
  },
];

function formatLabel(text, index, total) {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';
  } else if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  return textCfg;
}

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = items[0].title;
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
        <Axis dataKey="date" label={formatLabel} />
        <Axis dataKey="value" label={{ fontSize: 12 }} />
        <Geom geom="line" position="date*value" />
        <Tooltip showItemMarker={false} showCrosshairs onShow={onShowTooltip} />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

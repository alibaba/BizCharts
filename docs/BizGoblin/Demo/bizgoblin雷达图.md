# bizgoblin雷达图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0968e2b0-997a-11ea-bd36-0f0eda3e7ac1.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Coord, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  {
    item: 'Design',
    user: '用户 A',
    score: 70,
  }, {
    item: 'Design',
    user: '用户 B',
    score: 30,
  }, {
    item: 'Development',
    user: '用户 A',
    score: 60,
  }, {
    item: 'Development',
    user: '用户 B',
    score: 70,
  }, {
    item: 'Marketing',
    user: '用户 A',
    score: 50,
  }, {
    item: 'Marketing',
    user: '用户 B',
    score: 60,
  }, {
    item: 'Users',
    user: '用户 A',
    score: 40,
  }, {
    item: 'Users',
    user: '用户 B',
    score: 50,
  }, {
    item: 'Test',
    user: '用户 A',
    score: 60,
  }, {
    item: 'Test',
    user: '用户 B',
    score: 70,
  }, {
    item: 'Language',
    user: '用户 A',
    score: 70,
  }, {
    item: 'Language',
    user: '用户 B',
    score: 50,
  }, {
    item: 'Technology',
    user: '用户 A',
    score: 70,
  }, {
    item: 'Technology',
    user: '用户 B',
    score: 40,
  }, {
    item: 'Support',
    user: '用户 A',
    score: 60,
  }, {
    item: 'Support',
    user: '用户 B',
    score: 40,
  },
];

const defs = [{
  dataKey: 'score',
  min: 0,
  max: 120,
  nice: false,
  tickCount: 4,
}];

const pixelRatio = window.devicePixelRatio * 2;

function formatLabel(text, index, total) {
  if (index === total - 1) {
    return null;
  }
  return {
    top: true,
  };
}

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="score" label={formatLabel} grid={{ lineDash: null, type: 'arc' }} />
        <Axis dataKey="item" grid={{ lineDash: null }} />
        <Coord type="polar" />
        <Legend />
        <Geom geom="line" position="item*score" color="user" />
        <Geom geom="point" position="item*score" color="user" style={{ stroke: '#FFF', lineWidth: 1 }} />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

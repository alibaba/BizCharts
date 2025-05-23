# bizgoblin散点图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096a9060-997a-11ea-8225-e30c1937e15c.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Legend } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const height = 240;
const width = 320;
const pixelRatio = window.devicePixelRatio * 2;

const data = [
  {
    gender: 'female',
    height: 167.5,
    weight: 59,
  },
  {
    gender: 'female',
    height: 159.5,
    weight: 49.2,
  },
  {
    gender: 'female',
    height: 157,
    weight: 63,
  },
  {
    gender: 'female',
    height: 155.8,
    weight: 53.6,
  },
  {
    gender: 'female',
    height: 170,
    weight: 59,
  },
  {
    gender: 'female',
    height: 159.1,
    weight: 47.6,
  },
  {
    gender: 'female',
    height: 166,
    weight: 69.8,
  },
  {
    gender: 'female',
    height: 176.2,
    weight: 66.8,
  },
  {
    gender: 'female',
    height: 160.2,
    weight: 75.2,
  },
  {
    gender: 'female',
    height: 172.5,
    weight: 55.2,
  },
  {
    gender: 'female',
    height: 170.9,
    weight: 54.2,
  },
  {
    gender: 'female',
    height: 172.9,
    weight: 62.5,
  },
  {
    gender: 'female',
    height: 153.4,
    weight: 42,
  },
  {
    gender: 'female',
    height: 160,
    weight: 50,
  },
  {
    gender: 'female',
    height: 147.2,
    weight: 49.8,
  },
  {
    gender: 'female',
    height: 168.2,
    weight: 49.2,
  },
  {
    gender: 'female',
    height: 175,
    weight: 73.2,
  },
  {
    gender: 'female',
    height: 157,
    weight: 47.8,
  },
  {
    gender: 'female',
    height: 167.6,
    weight: 68.8,
  },
  {
    gender: 'female',
    height: 159.5,
    weight: 50.6,
  },
  {
    gender: 'female',
    height: 175,
    weight: 82.5,
  },
  {
    gender: 'female',
    height: 166.8,
    weight: 57.2,
  },
  {
    gender: 'female',
    height: 176.5,
    weight: 87.8,
  },
  {
    gender: 'female',
    height: 170.2,
    weight: 72.8,
  },
  {
    gender: 'female',
    height: 174,
    weight: 54.5,
  },
  {
    gender: 'female',
    height: 173,
    weight: 59.8,
  },
  {
    gender: 'female',
    height: 179.9,
    weight: 67.3,
  },
  {
    gender: 'female',
    height: 170.5,
    weight: 67.8,
  },
  {
    gender: 'female',
    height: 160,
    weight: 47,
  },
  {
    gender: 'female',
    height: 154.4,
    weight: 46.2,
  },
  {
    gender: 'female',
    height: 162,
    weight: 55,
  },
  {
    gender: 'female',
    height: 176.5,
    weight: 83,
  },
  {
    gender: 'female',
    height: 160,
    weight: 54.4,
  },
  {
    gender: 'female',
    height: 152,
    weight: 45.8,
  },
  {
    gender: 'female',
    height: 162.1,
    weight: 53.6,
  },
  {
    gender: 'female',
    height: 170,
    weight: 73.2,
  },
  {
    gender: 'female',
    height: 160.2,
    weight: 52.1,
  },
  {
    gender: 'female',
    height: 161.3,
    weight: 67.9,
  },
  {
    gender: 'female',
    height: 166.4,
    weight: 56.6,
  },
  {
    gender: 'female',
    height: 168.9,
    weight: 62.3,
  },
  {
    gender: 'female',
    height: 163.8,
    weight: 58.5,
  },
  {
    gender: 'male',
    height: 174,
    weight: 86.8,
  },
  {
    gender: 'male',
    height: 174,
    weight: 72.2,
  },
  {
    gender: 'male',
    height: 177,
    weight: 71.6,
  },
  {
    gender: 'male',
    height: 186,
    weight: 84.8,
  },
  {
    gender: 'male',
    height: 167,
    weight: 68.2,
  },
  {
    gender: 'male',
    height: 171.8,
    weight: 66.1,
  },
  {
    gender: 'male',
    height: 182,
    weight: 72,
  },
  {
    gender: 'male',
    height: 167,
    weight: 64.6,
  },
  {
    gender: 'male',
    height: 177.8,
    weight: 74.8,
  },
  {
    gender: 'male',
    height: 164.5,
    weight: 70,
  },
  {
    gender: 'male',
    height: 192,
    weight: 101.6,
  },
  {
    gender: 'male',
    height: 175.5,
    weight: 63.2,
  },
  {
    gender: 'male',
    height: 171.2,
    weight: 79.1,
  },
  {
    gender: 'male',
    height: 181.6,
    weight: 78.9,
  },
  {
    gender: 'male',
    height: 167.4,
    weight: 67.7,
  },
  {
    gender: 'male',
    height: 181.1,
    weight: 66,
  },
  {
    gender: 'male',
    height: 177,
    weight: 68.2,
  },
  {
    gender: 'male',
    height: 174.5,
    weight: 63.9,
  },
  {
    gender: 'male',
    height: 177.5,
    weight: 72,
  },
  {
    gender: 'male',
    height: 170.5,
    weight: 56.8,
  },
  {
    gender: 'male',
    height: 182.4,
    weight: 74.5,
  },
  {
    gender: 'male',
    height: 197.1,
    weight: 90.9,
  },
  {
    gender: 'male',
    height: 180.1,
    weight: 93,
  },
  {
    gender: 'male',
    height: 175.5,
    weight: 80.9,
  },
  {
    gender: 'male',
    height: 180.6,
    weight: 72.7,
  },
  {
    gender: 'male',
    height: 184.4,
    weight: 68,
  },
  {
    gender: 'male',
    height: 175.5,
    weight: 70.9,
  },
  {
    gender: 'male',
    height: 180.6,
    weight: 72.5,
  },
  {
    gender: 'male',
    height: 177,
    weight: 72.5,
  },
  {
    gender: 'male',
    height: 177.1,
    weight: 83.4,
  },
  {
    gender: 'male',
    height: 181.6,
    weight: 75.5,
  },
  {
    gender: 'male',
    height: 176.5,
    weight: 73,
  },
  {
    gender: 'male',
    height: 175,
    weight: 70.2,
  },
  {
    gender: 'male',
    height: 174,
    weight: 73.4,
  },
  {
    gender: 'male',
    height: 165.1,
    weight: 70.5,
  },
  {
    gender: 'male',
    height: 177,
    weight: 68.9,
  },
  {
    gender: 'male',
    height: 192,
    weight: 102.3,
  },
  {
    gender: 'male',
    height: 176.5,
    weight: 68.4,
  },
  {
    gender: 'male',
    height: 169.4,
    weight: 65.9,
  },
  {
    gender: 'male',
    height: 182.1,
    weight: 75.7,
  },
  {
    gender: 'male',
    height: 179.8,
    weight: 84.5,
  },
  {
    gender: 'male',
    height: 175.3,
    weight: 87.7,
  },
  {
    gender: 'male',
    height: 184.9,
    weight: 86.4,
  },
];

const defs = [{
  dataKey: 'height',
  tickCount: 5,
}, {
  dataKey: 'weight',
  tickCount: 5,
}];

function formatLabel(test, index, total) {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';
  } else if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  return textCfg;
}

class Demo extends React.Component {
  render() {
    return (
      <Chart height={height} width={width} data={data} defs={defs} pixelRatio={pixelRatio} >
        <Axis dataKey="height" label={formatLabel} />
        <Legend />
        <Geom geom="point" position="height*weight" color="gender" style={{ fillOpacity: 0.65 }} />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

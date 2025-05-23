# bizgoblin玫瑰图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/096f2440-997a-11ea-9761-adf4e02ffa04.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Coord, Legend, Geom } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const data = [{
  year: '2001',
  population: 41.8,
}, {
  year: '2002',
  population: 25.8,
}, {
  year: '2003',
  population: 31.7,
}, {
  year: '2004',
  population: 46,
}, {
  year: '2005',
  population: 28,
}];

class Demo extends React.Component {
  render() {
    return (
      <Chart width="100%" data={data} pixelRatio={pixelRatio} >
        <Coord type="polar" innerRadius={0} />
        <Legend position="right" />
        <Geom geom="interval" position="year*population" color="year" style={{ lineWidth: 1, stroke: '#FFF' }} />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

# geom  style回调

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/21c2c120-1e84-11eb-981b-6d6ccc86a0f9.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip } from 'bizcharts';

// 数据源
const data = [
  { year: '1991', value: 3, marked: false },
  { year: '1992', value: 4, marked: true },
  { year: '1993', value: 3.5, marked: false },
  { year: '1994', value: 5, marked: false },
  { year: '1995', value: 4.9, marked: false },
  { year: '1996', value: 6, marked: true },
  { year: '1997', value: 7, marked: false },
  { year: '1998', value: 9, marked: false },
  { year: '1999', value: 13, marked: false },
];

function Demo() {
  return <Chart
    padding={ [10, 20, 50, 40] }
  autoFit
  height = { 500}
  data = { data }
  scale = {{ value: { min: 0 } }
}
  >
  {/* 参考文档 https://bizcharts.net/product/bizcharts/category/7/page/27#style */ }
  < Line position = "year*value" />
    {/* <LineChart/>暂不支持引入多个字段 */ }
    < Point position = "year*value"   style = {
      ['year*value*marked', (year, value, marked) => {
        console.log('marked', marked)
        return {
          fill: marked ? 'red' : 'white'
        }
      }]} />
      <Tooltip showCrosshairs />
      </Chart>
}

ReactDOM.render(<Demo />, mountNode);



```

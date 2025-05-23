# 数据全部为零时显示Y轴

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/b044ff00-c734-11ea-a73a-8dd3717e078c.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

// 数据源
const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Jan",
    city: "London",
    temperature: 0
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Feb",
    city: "London",
    temperature: 0
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Mar",
    city: "London",
    temperature: 0
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Apr",
    city: "London",
    temperature: 0
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "May",
    city: "London",
    temperature: 0
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Jun",
    city: "London",
    temperature: 0
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Jul",
    city: "London",
    temperature: 0
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Aug",
    city: "London",
    temperature: 0
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Sep",
    city: "London",
    temperature: 0
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Oct",
    city: "London",
    temperature: 0
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Nov",
    city: "London",
    temperature: 0
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 0
  },
  {
    month: "Dec",
    city: "London",
    temperature: 0
  }
];

const scale = {
  temperature: {
    min: 0,
    max: 50,
    tickCount: 5,
  }
}

function Demo() {
  return <Chart scale={scale} padding={[10, 20, 50, 40]} autoFit height={500} data={data} >
    <Line shape="smooth" position="month*temperature" color="city" />
    <Point position="month*temperature" color="city" />
    <Tooltip shared={true} />
    <Legend itemName={{
      style: {
        fill: "#333"
      }
    }} />
  </Chart>
}



ReactDOM.render(<Demo />, mountNode);



```

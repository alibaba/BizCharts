# 极坐标下的柱状图（Coordinate）

![预览](https://z.alicdn.com/alickn/chu-ko-no/2020-5-6/bizcharts/d2ed578f-140e-4683-a09a-7ca96d2a3bef/d2ed578f-140e-4683-a09a-7ca96d2a3bef.png)

```js
import React from "react";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
  Coordinate
} from "bizcharts";

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];

function Grouped() {
  return (
    <Chart height={400} padding="auto" data={data} autoFit>
      <Interval
        adjust={[
         {
            type: 'dodge',
            marginRatio: 1,
          },
        ]}
        color="name"
        position="月份*月均降雨量"
      />
      <Coordinate type="polar"/>
      <Tooltip shared />
    </Chart>
  );
}

ReactDOM.render(<Grouped />, mountNode)

```

# 分组柱状图 数值量级差异过大 type=log

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/edc7af40-1dcd-11eb-b176-1760939fd567.png)

```js
import React from "react";
import { G2, Chart, Tooltip, Interval } from "bizcharts";

const data = [
  { name: "London", 月份: "Jan.", 月均降雨量: 180.9 },
  { name: "London", 月份: "Feb.", 月均降雨量: 280.8 },
  { name: "London", 月份: "Mar.", 月均降雨量: 390.3 },
  { name: "London", 月份: "Apr.", 月均降雨量: 810.4 },
  { name: "London", 月份: "May", 月均降雨量: 470 },
  { name: "London", 月份: "Jun.", 月均降雨量: 200.3 },
  { name: "London", 月份: "Jul.", 月均降雨量: 240 },
  { name: "London", 月份: "Aug.", 月均降雨量: 350.6 },
  { name: "Berlin", 月份: "Jan.", 月均降雨量: 1200000.4 },
  { name: "Berlin", 月份: "Feb.", 月均降雨量: 2300000.2 },
  { name: "Berlin", 月份: "Mar.", 月均降雨量: 3400000.5 },
  { name: "Berlin", 月份: "Apr.", 月均降雨量: 990000.7 },
  { name: "Berlin", 月份: "May", 月均降雨量: 520000.6 },
  { name: "Berlin", 月份: "Jun.", 月均降雨量: 350000.5 },
  { name: "Berlin", 月份: "Jul.", 月均降雨量: 370000.4 },
  { name: "Berlin", 月份: "Aug.", 月均降雨量: 420000.4 },
];

const scale = {
  月均降雨量: {
    type: "log",
    base: 10,
  },
};

function Grouped() {
  return (
    <Chart height={400} padding="auto" data={data} autoFit scale={scale}>
      <Interval
        adjust={[
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]}
        color="name"
        position="月份*月均降雨量"
      />
      <Tooltip shared />
    </Chart>
  );
}

ReactDOM.render(<Grouped />, mountNode);

```

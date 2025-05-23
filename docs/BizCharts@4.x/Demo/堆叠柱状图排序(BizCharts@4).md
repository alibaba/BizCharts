# 堆叠柱状图排序(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/130e3ce0-2ec4-11eb-a65b-e3cbe799403e.png)

```js
import React from "react";
import { G2, Chart, Tooltip, Interval, Coord } from "bizcharts";

const data = [
  { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
  { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
  { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
  { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
  { name: "London", 月份: "May", 月均降雨量: 47 },
  { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
  { name: "London", 月份: "Jul.", 月均降雨量: 24 },
  { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
  { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
  { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
  { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
  { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
  { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
  { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
  { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
  { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
];

// 计算累加值
const summery = data.reduce((pre, cur) => {
  const { 月份: month, 月均降雨量: rain } = cur;
  let item = pre.find((p) => p.key === month);
  if (!item) {
    item = { key: month, value: rain };
    pre.push(item);
  } else item.value += rain;
  return pre;
}, []);
// 排序
summery.sort((s1, s2) => s1.value - s2.value);
// 设置X轴刻度值
const scale = {
  月份: {
    values: summery.map((s) => s.key),
  },
};

function Demo() {
  return (
    <Chart height={400} padding="auto" data={data} scale={scale} autoFit>
      <Interval
        adjust={[
          {
            type: "stack",
          },
        ]}
        color="name"
        position="月份*月均降雨量"
      />
      <Tooltip shared />
    </Chart>
  );
}

ReactDOM.render(<Demo />, mountNode);

```

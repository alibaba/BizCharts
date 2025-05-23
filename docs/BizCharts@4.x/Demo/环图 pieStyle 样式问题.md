# 环图 pieStyle 样式问题

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/35db1d40-604e-11eb-b6ac-c11ccf54cc02.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import { DonutChart } from "bizcharts";

// 数据源
const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其它",
    value: 5,
  },
];

function Demo() {
  return (
    <DonutChart
      data={data || []}
      title={{
        visible: true,
        text: "环图",
      }}
      autoFit
      description={{
        visible: true,
        text: "环图的外半径决定环图的大小，而内半径决定环图的厚度。",
      }}
			height={350}
      radius={0.8}
      padding="auto"
      angleField="value"
      colorField="type"
      pieStyle={{ stroke: "white", lineWidth: 5 }}
    />
  );
}

ReactDOM.render(<Demo />, mountNode);

```

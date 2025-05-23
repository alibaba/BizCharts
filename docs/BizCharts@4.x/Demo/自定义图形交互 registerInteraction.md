# 自定义图形交互 registerInteraction

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/59140bc0-d23f-11ea-9dee-c72a06f9a05d.png)

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  Chart,
  Interval,
  Interaction,
  registerInteraction,
  Tooltip,
} from "bizcharts";

registerInteraction("element-link", {
  start: [
    { trigger: "interval:mouseenter", action: "element-link-by-color:link" },
  ],
  end: [
    { trigger: "interval:mouseleave", action: "element-link-by-color:unlink" },
  ],
});

// 数据源
const data = [
  { year: "2014", type: "Sales", sales: 1000 },
  { year: "2015", type: "Sales", sales: 1170 },
  { year: "2016", type: "Sales", sales: 660 },
  { year: "2017", type: "Sales", sales: 1030 },
  { year: "2014", type: "Expenses", sales: 400 },
  { year: "2015", type: "Expenses", sales: 460 },
  { year: "2016", type: "Expenses", sales: 1120 },
  { year: "2017", type: "Expenses", sales: 540 },
  { year: "2014", type: "Profit", sales: 300 },
  { year: "2015", type: "Profit", sales: 300 },
  { year: "2016", type: "Profit", sales: 300 },
  { year: "2017", type: "Profit", sales: 350 },
];

const scale = {
  sales: {
    max: 2400,
    tickInterval: 600,
    nice: true,
  },
};

function Demo() {
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      height={500}
      data={data}
      scale={scale}
    >
      <Tooltip showMarkers={false} />
      <Interval position="year*sales" color="type" adjust="stack" />
      <Interaction type="element-highlight" />
      <Interaction type="element-link" />
    </Chart>
  );
}

ReactDOM.render(<Demo />, mountNode);

```

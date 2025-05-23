# 修复Invalid Date in fecha.format

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/fe224870-5f89-11eb-b8a3-4f1eeb0fc6f2.png)

```js
import React from "react";
import {
  Chart,
  Axis,
  Tooltip,
  Area,
  Line,
} from "bizcharts";
import DataSet from "@antv/data-set";

const data = [];
const dv = new DataSet.View().source(data);
dv.transform({
  type: "fold",
  fields: ["ask", "order", "pay"], // 展开字段集
  key: "type", // key字段
  value: "value", // value字段
});

const data2 = [
  { timestamp: 1571888800221, order: 3456, ask: 9988, pay: 654, sr: 0.85 },
  { timestamp: 1571888860221, order: 8754, ask: 5000, pay: 17051, sr: 0.97 },
  { timestamp: 1571888920221, order: 36572, ask: 16000, pay: 3545, sr: 0.99 },
];
const dv2 = new DataSet.View().source(data2);
dv2.transform({
  type: "fold",
  fields: ["ask", "order", "pay"], // 展开字段集
  key: "type", // key字段
  value: "value", // value字段
});

const scale = {
  timestamp: {
    type: "timeCat",
    mask: "HH:mm:ss",
    tickCount: 6,
  },
  value: {
    tickCount: 3,
  },
};

const colors = {
  ask: "l (90) 0.5:rgba(0,136,255, 1) 1:rgba(0,136,255, 0)",
  order: "l (90) 0.5:rgba(0,231,147, 1) 1:rgba(0,231,147, 0)",
  pay: "l (90) 0.5:rgba(255,195,50, 1) 1:rgba(255,195,50, 0)",
};

class Areanull extends React.Component {
  render() {
    return (
      <div>
			<h4>有数据</h4>
        <Chart
          height={240}
          data={dv2}
          padding={"auto"}
          scale={scale}
          autoFit
          padding="auto"
        >
          <Axis
            name="timestamp"
            line={{
              stroke: "#95D4FF",
            }}
            label={{
              textStyle: {
                fill: "#95D4FF",
              },
            }}
            tickLine={{
              lineWidth: 4,
              lineCap: "round",
              length: 1,
              stroke: "#95D4FF",
            }}
          />
          <Axis
            name="value"
            grid={null}
            position="left"
            line={{
              stroke: "#95D4FF",
            }}
            label={{
              textStyle: {
                fill: "#95D4FF",
                fontWeight: "bold",
              },
            }}
          />
          <Area
            adjust="stack"
            color={["type", (type) => colors[type]]}
            position="timestamp*value"
          />
          <Line
            adjust="stack"
            color={["type", (type) => colors[type]]}
            position="timestamp*value"
          />
        </Chart>
				<h4>空数据</h4>
        <Chart
          height={240}
          data={dv}
          scale={scale}
          autoFit
          padding="auto"
        >
          <Axis
            name="timestamp"
            line={{
              stroke: "#95D4FF",
            }}
            label={{
              textStyle: {
                fill: "#95D4FF",
              },
            }}
            tickLine={{
              lineWidth: 4,
              lineCap: "round",
              length: 1,
              stroke: "#95D4FF",
            }}
          />
          <Axis
            name="value"
            grid={null}
            position="left"
            line={{
              stroke: "#95D4FF",
            }}
            label={{
              textStyle: {
                fill: "#95D4FF",
                fontWeight: "bold",
              },
            }}
          />

          <Tooltip shared />
          <Area
            adjust="stack"
            color={["type", (type) => colors[type]]}
            position="timestamp*value"
          />
          <Line
            adjust="stack"
            color={["type", (type) => colors[type]]}
            position="timestamp*value"
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Areanull />, mountNode);
```

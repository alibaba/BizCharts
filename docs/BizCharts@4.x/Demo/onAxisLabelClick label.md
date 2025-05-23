# onAxisLabelClick label

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/002a4160-28ab-11eb-8e3a-e320dddad297.png)

```js
import React from "react";
import ReactDOM from "react-dom";
{/* 注意如果使用 onAxisLabelClick，请锁死4.0.13版本，待后续升级4.1.x */}
import { BarChart, Chart, Interval, Coordinate, Interaction } from "bizcharts@4.0.13";
import numeral from "numeral";
import _ from "lodash";

// 数据源
const data = [
  { 地区: "华东", 销售额: 4684506.442 },
  { 地区: "中南", 销售额: 4137415.0929999948 },
  { 地区: "东北", 销售额: 2681567.469000001 },
  { 地区: "华北", 销售额: 2447301.017000004 },
  { 地区: "西南", 销售额: 1303124.508000002 },
  { 地区: "西北", 销售额: 815039.5959999998 },
  { 地区: "华东2", 销售额: 2684506.442 },
  { 地区: "中南2", 销售额: 5137415.0929999948 },
  { 地区: "东北2", 销售额: 3681567.469000001 },
  { 地区: "华北2", 销售额: 1447301.017000004 },
  { 地区: "西南2", 销售额: 303124.508000002 },
  { 地区: "西北2", 销售额: 915039.5959999998 },
];
function Demo() {
  return (
    <>
      <Chart
        height={400}
        data={data}
        autoFit
        scale={{
          销售额: {
            formatter: (v) => Math.round(v / 10000) + "万",
          },
        }}
        onAxisLabelClick={(event, chart) => {
          console.log("event", event, "chart", chart);
          console.log("data", chart.filteredData);
					console.log("mytext", event.target.attrs.text);
          console.log("selectedRecord", chart.getSnapRecords(event)[0]._origin);
        }}
      >
        <Coordinate transpose />
        <Interval
          position="地区*销售额"
          label={[
            "销售额",
            (val) => ({
              position: "middle", // top|middle|bottom|left|right
              offsetX: -15,
              // content: numeral(val).format('0,0'),
              style: {
                fill: "#fff",
              },
            }),
            // {
            //   layout: {
            //     type: "overlap",
            //   },
            // },
          ]}
        />
        <Interaction type="active-region" />
      </Chart>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);

```

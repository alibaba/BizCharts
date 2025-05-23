#  自定义Legend的使用

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/a0ff9530-24bf-11eb-9098-fd0ccaa1acff.png)

```js
import React from "react";
import { G2, Chart, Tooltip, Interval, Legend } from "bizcharts";

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

// const legendLabelConfig = {
// 	// 文本同滑轨的对齐方式，有五种类型
// 	// rail ： 同滑轨对齐，在滑轨的两端
// 	// top, bottom: 图例水平布局时有效
// 	// left, right: 图例垂直布局时有效
// 	align: "right",
// 	spacing: 10, // 文本同滑轨的距离
// 	style: {
// 		stroke: 'blue',
// 		fill: 'red'
// 	} // 文本样式
// }

function Grouped() {
  return (
    <Chart
      height={400}
      padding="auto"
      data={data}
      autoFit
      containerStyle={{
        padding: "20px",
      }}
    >
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
      <Legend
        layout="vertical"
        position="top-left"
        // itemName={{ formatter: () => 'custname' }} itemValue={{ formatter: () => 323 }}
        itemName={{
          spacing: 10, // 文本同滑轨的距离
          style: {
            // stroke: 'blue',
            fill: "red",
          },
          formatter: (text, item, index) => {
            console.log("text", text, item);
            return text === "Berlin" ? "Berlin【重点关注】" : text;
          },
        }}
      />
    </Chart>
  );
}

ReactDOM.render(<Grouped />, mountNode);

```

# tab切换 Annotation

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/4ad32700-d7a1-11ea-82fc-e1f1335f6226.png)

```js
import React from "react";
import {
  G2,
  Chart,
  LineAdvance,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Annotation,
  Shape,
  Facet,
  Util,
} from "bizcharts";
import { Tab } from "@alifd/next";

function onChange(key) {
  console.log(key);
}
let data1 = [
  {
    x: "2020-07-17",
    category: "商品GMV净值",
    y: 1,
  },
  {
    x: "2020-07-17",
    category: "类目GMV净值",
    y: 1,
  },
  {
    x: "2020-07-18",
    category: "商品GMV净值",
    y: 1.99,
  },
  {
    x: "2020-07-18",
    category: "类目GMV净值",
    y: 1.05,
  },
  {
    x: "2020-07-19",
    category: "商品GMV净值",
    y: 0.89,
  },
  {
    x: "2020-07-19",
    category: "类目GMV净值",
    y: 1.06,
  },
  {
    x: "2020-07-20",
    category: "商品GMV净值",
    y: 2.24,
  },
  {
    x: "2020-07-20",
    category: "类目GMV净值",
    y: 1.09,
  },
  {
    x: "2020-07-21",
    category: "商品GMV净值",
    y: 2.02,
  },
  {
    x: "2020-07-21",
    category: "类目GMV净值",
    y: 1.04,
  },
  {
    x: "2020-07-22",
    category: "商品GMV净值",
    y: 2.62,
  },
  {
    x: "2020-07-22",
    category: "类目GMV净值",
    y: 1.13,
  },
  {
    x: "2020-07-23",
    category: "商品GMV净值",
    y: 1.61,
  },
  {
    x: "2020-07-23",
    category: "类目GMV净值",
    y: 0.91,
  },
  {
    x: "2020-07-24",
    category: "商品GMV净值",
    y: 0.62,
  },
  {
    x: "2020-07-24",
    category: "类目GMV净值",
    y: 1.01,
  },
  {
    x: "2020-07-25",
    category: "商品GMV净值",
    y: 1.22,
  },
  {
    x: "2020-07-25",
    category: "类目GMV净值",
    y: 1.2,
  },
  {
    x: "2020-07-26",
    category: "商品GMV净值",
    y: 0.75,
  },
  {
    x: "2020-07-26",
    category: "类目GMV净值",
    y: 1.21,
  },
];
let data2 = [
  {
    x: "2020-07-17",
    category: "商品GMV净值",
    y: 1,
  },
  {
    x: "2020-07-17",
    category: "类目GMV净值",
    y: 1,
  },
  {
    x: "2020-07-18",
    category: "商品GMV净值",
    y: 1.07,
  },
  {
    x: "2020-07-18",
    category: "类目GMV净值",
    y: 0.98,
  },
  {
    x: "2020-07-19",
    category: "商品GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-19",
    category: "类目GMV净值",
    y: 1.06,
  },
  {
    x: "2020-07-20",
    category: "商品GMV净值",
    y: 1.13,
  },
  {
    x: "2020-07-20",
    category: "类目GMV净值",
    y: 1,
  },
  {
    x: "2020-07-21",
    category: "商品GMV净值",
    y: 1.21,
  },
  {
    x: "2020-07-21",
    category: "类目GMV净值",
    y: 1.06,
  },
  {
    x: "2020-07-22",
    category: "商品GMV净值",
    y: 1.25,
  },
  {
    x: "2020-07-22",
    category: "类目GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-23",
    category: "商品GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-23",
    category: "类目GMV净值",
    y: 1.05,
  },
  {
    x: "2020-07-24",
    category: "商品GMV净值",
    y: 0.88,
  },
  {
    x: "2020-07-24",
    category: "类目GMV净值",
    y: 0.89,
  },
  {
    x: "2020-07-25",
    category: "商品GMV净值",
    y: 0.96,
  },
  {
    x: "2020-07-25",
    category: "类目GMV净值",
    y: 0.96,
  },
  {
    x: "2020-07-26",
    category: "商品GMV净值",
    y: 0.93,
  },
  {
    x: "2020-07-26",
    category: "类目GMV净值",
    y: 1,
  },
];
let data3 = [
  {
    x: "2020-07-17",
    category: "商品GMV净值",
    y: 1,
  },
  {
    x: "2020-07-17",
    category: "类目GMV净值",
    y: 1,
  },
  {
    x: "2020-07-18",
    category: "商品GMV净值",
    y: 1.27,
  },
  {
    x: "2020-07-18",
    category: "类目GMV净值",
    y: 0.98,
  },
  {
    x: "2020-07-19",
    category: "商品GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-19",
    category: "类目GMV净值",
    y: 1.06,
  },
  {
    x: "2020-07-20",
    category: "商品GMV净值",
    y: 1.13,
  },
  {
    x: "2020-07-20",
    category: "类目GMV净值",
    y: 1,
  },
  {
    x: "2020-07-21",
    category: "商品GMV净值",
    y: 1.21,
  },
  {
    x: "2020-07-21",
    category: "类目GMV净值",
    y: 1.06,
  },
  {
    x: "2020-07-22",
    category: "商品GMV净值",
    y: 1.25,
  },
  {
    x: "2020-07-22",
    category: "类目GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-23",
    category: "商品GMV净值",
    y: 1.03,
  },
  {
    x: "2020-07-23",
    category: "类目GMV净值",
    y: 1.05,
  },
  {
    x: "2020-07-24",
    category: "商品GMV净值",
    y: 0.88,
  },
  {
    x: "2020-07-24",
    category: "类目GMV净值",
    y: 0.89,
  },
  {
    x: "2020-07-25",
    category: "商品GMV净值",
    y: 0.96,
  },
  {
    x: "2020-07-25",
    category: "类目GMV净值",
    y: 0.96,
  },
  {
    x: "2020-07-26",
    category: "商品GMV净值",
    y: 0.93,
  },
  {
    x: "2020-07-26",
    category: "类目GMV净值",
    y: 1,
  },
];

const myTabs = [
  {
    tab: "案例一",
    key: "first",
    content: "This is home page",
    start: 0,
    end: 1.99,
    data: data1,
  },
  {
    tab: "案例二",
    key: "second",
    content: "This is document page",
    start: 0,
    end: 1.07,
    data: data2,
  },
  {
    tab: "案例三",
    key: "third",
    content: "This is api page",
    start: 0,
    end: 1.27,
    data: data3,
  },
];
const scale = {
  y: {
    min: 0,
  },
  x: {
    range: [0.05, 0.95],
  },
};

const lineStyle = {
  stroke: "#000",
  lineDash: [0, 1, 1],
  lineWidth: 1,
};
const text = {
  position: "start",
  autoRotate: false,
  style: {
    fill: "red",
  },
  offsetX: 20,
  offsetY: -20,
  content: "待测试",
};

class Series extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab shape="wrapped" onChange={onChange} style={{ padding: "10px" }}>
        {myTabs.map((tab) => (
          <Tab.Item title={tab.tab} key={tab.key}>
            {/* autoFit，图表大小自适应，对外层容器的宽和高都会适应。 */}
            <Chart
              height={400}
              data={tab.data}
              scale={scale}
              autoFit
              padding="auto"
              containerStyle={{
                border: "1px solid #ddd",
                borderTop: "none",
                padding: "25px",
              }}
            >
              <Legend />
              <Axis name="x" />
              <Tooltip showCrosshairs shared />
              <LineAdvance
                // area
                point={{ size: 3 }}
								// shape="smooth"
                tooltip={["x*y"]}
                position="x*y"
                size={2}
                color={"category"}
              />
              <Annotation.Line
                start={{ x: "2020-07-18", y: tab.start }}
                end={{ x: "2020-07-18", y: tab.end }}
                lineStyle={lineStyle}
                text={text}
              />
            </Chart>
          </Tab.Item>
        ))}
      </Tab>
    );
  }
}

ReactDOM.render(<Series />, mountNode);

```

# BizCharts分组条形图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/3d13df00-9e31-11ea-9739-e5168f74bcd2.png)

```js
import React from "react";
import {
  G2,
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Grouped extends React.Component {
  render() {
    const data = [
      {
        label: "Monday",
        series1: 2800,
        series2: 2260
      },
      {
        label: "Tuesday",
        series1: 1800,
        series2: 1300
      },
      {
        label: "Wednesday",
        series1: 950,
        series2: 900
      },
      {
        label: "Thursday",
        series1: 500,
        series2: 390
      },
      {
        label: "Friday",
        series1: 170,
        series2: 100
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["series1", "series2"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    return (
        <Chart 
          height={400} 
          width={500}
          data={dv} 
          autoFit
        >
          <Legend />
          <Coordinate transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Interval
            position="label*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
    );
  }
}

ReactDOM.render(<Grouped />, mountNode)

```

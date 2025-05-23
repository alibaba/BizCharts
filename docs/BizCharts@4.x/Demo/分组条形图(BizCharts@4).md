# 分组条形图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/1550f100-5f84-11eb-b8a3-4f1eeb0fc6f2.png)

```js
import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  Interval
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
      <Chart height={400} data={dv.rows} autoFit>
          <Legend />
          <Coordinate actions={[['scale', 1, -1], ['transpose']]} />
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

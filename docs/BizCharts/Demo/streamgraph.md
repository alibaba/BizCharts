# streamgraph

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77ef5e90-9979-11ea-a591-9be663db1ad5.png)

```js
import $ from "jquery";
import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts@3.5.8";
import DataSet from "@antv/data-set";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/other-streamgraph/0.2.9/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

class Streamgraph extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const { DataView } = DataSet;
    const dv = new DataView()
      .source(data)
      .transform({
        type: "fill-rows",
        groupBy: ["name"],
        orderBy: ["year"]
      })
      .transform({
        type: "impute",
        field: "n",
        method: "value",
        value: 0
      })
      .transform({
        type: "aggregate",
        fields: ["n"],
        operations: ["sum"],
        groupBy: ["year", "name"],
        orderBy: ["year"],
        as: ["count"]
      });
    const cols = {
      year: {
        tickInterval: 10,
        nice: false
      },
      count: {
        nice: false
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={[0, 140, 60, 50]}
          plotBackground={{
            stroke: "#ccc"
          }}
          forceFit
        >
          <Axis name="year" line={null} />
          <Axis
            name="count"
            line={null}
            tickLine={{
              length: 8
            }}
            subTickCount={10}
            subTickLine={{
              lineWidth: 1,
              // 子刻度线宽
              stroke: "#ddd",
              // 子刻度线颜色
              length: 5
            }}
            grid={null}
          />
          <Legend
            position="right"
            useHtml={true}
            title={{
              text: "图例可滚动"
            }}
            g2-legend-marker={{
              borderRadius: "none"
            }}
            g2-legend-title={{
              fontSize: "12px",
              fontWeight: 500,
              margin: 0,
              color: "#ff8800"
            }}
          />
          <Tooltip shared={false} crosshairs={false} inPlot={false} />
          <Geom
            type="area"
            position="year*count"
            color="name"
            adjust={["stack", "symmetric"]}
            shape="smooth"
            opacity={1}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Streamgraph />, mountNode)

```

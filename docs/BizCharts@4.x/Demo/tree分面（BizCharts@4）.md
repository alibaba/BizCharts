# tree分面（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/64fe9a10-afb5-11ea-837f-55d728e4ee90.png)

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
} from "bizcharts";
import DataSet from "@antv/data-set";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/facet-tree/0.3.1/mock.json",
  async: false,
  success: (iData) => { data = iData }
});

class Tree extends React.Component {
  render() {
    const DataView = DataSet.DataView;
    const scale = {
      cut: {
        sync: true
      },
      mean: {
        sync: true,
        tickCount: 5
      }
    };
    return (
        <Chart
          height={450}
          data={data}
          width={800}
          padding={[30, 80, 80, 80]}
          scale={scale}
        >
          <Legend name="cut" position={"top"} />
          <Axis name="cut" label={null} tickLine={null} />
          <Tooltip crosshairs={false} />
          <Facet
            type="tree"
            fields={["clarity"]}
            line={{
              stroke: "#c0d0e0",
              smooth: true
            }}
            eachView={(view, facet) => {
              const data = facet.data;
              const dv = new DataView();
              dv.source(data).transform({
                type: "aggregate",
                fields: ["price"],
                operations: ["mean"],
                as: ["mean"],
                groupBy: ["cut"]
              });
              view.data(dv.rows);
              view
                .interval()
                .position("cut*mean")
                .color("cut");
            }}
          />
        </Chart>
    );
  }
}

ReactDOM.render(<Tree />, mountNode)

```

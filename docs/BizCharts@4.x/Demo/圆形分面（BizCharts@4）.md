# 圆形分面（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/19dbad70-afb5-11ea-b974-bdbc104e7053.png)

```js
import $ from "jquery";
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
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/facet-circle/0.3.1/mock.json",
  async: false,
  success: (iData) => { data = iData }
});

class Circle extends React.Component {
  render() {
    const DataView = DataSet.DataView;
    const scale = {
      mean: {
        sync: true
      },
      cut: {
        sync: true
      }
    };
    return (
        <Chart
          height={450}
          data={data}
          width={800}
          padding={[30, 80, 80, 80]}
          axis={false}
          scale={scale}
        >
        <Coordinate type="polar" />
        <Axis visible={false} />
          <Facet
            type="circle"
            fields={["clarity"]}
            eachView={(view, facet) => {
              var data = facet.data;
              var dv = new DataView();
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
              view.interaction('element-active');
            }}
          />
        </Chart>
    );
  }
}

ReactDOM.render(<Circle />, mountNode)

```

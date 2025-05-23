# 极坐标 voronoi 图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77ae8500-9979-11ea-a591-9be663db1ad5.png)

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
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/g2-voronoi-polar/0.2.8/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

function getComponent(data) {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "diagram.voronoi",
    fields: ["x", "y"],
    size: [800, 600],
    as: ["_x", "_y"]
  });

  class SliderChart extends React.Component {
    render() {
      return (
        <Chart data={dv} padding={0} forceFit>
          <Tooltip showTitle={false} />
          <Coord type="polar" />
          <Geom type="polygon" position="_x*_y" color="value">
            <Label
              content="value"
              offset={0}
              textStyle={{
                fill: "#fff",
                fontSize: "12",
                textAlign: "center",
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          </Geom>
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Voronoipolar extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

ReactDOM.render(<Voronoipolar />, mountNode)

```

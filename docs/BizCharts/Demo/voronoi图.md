# voronoi图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77cb34c0-9979-11ea-a591-9be663db1ad5.png)

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
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/relation-voronoi/0.2.8/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

class Voronoi extends React.Component {
  render() {
    const { DataView } = DataSet;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "diagram.voronoi",
      fields: ["x", "y"],
      size: [800, 600],
      as: ["_x", "_y"]
    });
    return (
      <div>
        <Chart data={dv} forceFit={true} height={window.innerHeight}>
          <Tooltip showTitle={false} />
          <Geom type="polygon" position="_x*_y" color="value">
            <Label content="value" />
          </Geom>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Voronoi />, mountNode)

```

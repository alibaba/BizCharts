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

import data from "./mock.json";

class Histogrambinwidth extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView("diamond").source(data);
    dv.transform({
      type: "bin.histogram",
      field: "depth",
      binWidth: 4,
      // 在此修改矩形的宽度，代表真实数值的大小
      as: ["depth", "count"]
    });
    const cols = {
      depth: {
        tickInterval: 2
      }
    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Axis name="depth" />
          <Axis name="count" />
          <Tooltip inPlot={false} crosshairs={false} position={"top"} />
          <Geom type="interval" position="depth*count" />
        </Chart>
      </div>
    );
  }
}

export default Histogrambinwidth;

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

class Histogramstacked extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "bin.histogram",
      field: "depth",
      binWidth: 1,
      // offset: -0.3,
      groupBy: ["cut"],
      as: ["depth", "count"]
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Axis
            name="depth"
            grid={{
              lineStyle: {
                stroke: "#d9d9d9",
                lineWidth: 1,
                lineDash: [2, 2]
              }
            }}
          />
          <Axis name="count" />
          <Tooltip inPlot={false} crosshairs={false} position={"top"} />
          <Geom type="intervalStack" position="depth*count" color="cut" />
        </Chart>
      </div>
    );
  }
}

export default Histogramstacked;

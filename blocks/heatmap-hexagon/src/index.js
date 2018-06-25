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

import $ from "jquery";

import data from "./mock.json";

class Hexagon extends React.Component {
  render() {
    const { DataView } = DataSet;
    const $sizeEncoding = $("#size-encoding");
    $sizeEncoding.on("change", () => {
      if ($sizeEncoding.val() === "on") {
        ds.setState("sizeEncoding", true);
      } else {
        ds.setState("sizeEncoding", false);
      }
    });
    const ds = new DataSet({
      state: {
        sizeEncoding: false
      }
    });
    const dv = ds
      .createView()
      .source(data)
      .transform({
        sizeByCount: "$state.sizeEncoding",
        // calculate bin size by binning count
        type: "bin.hexagon",
        fields: ["x", "y"],
        // 对应坐标轴上的一个点
        bins: [10, 5]
      });
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} forceFit>
          <Tooltip showTitle={false} crosshairs={false} />
          <Axis
            name="x"
            grid={{
              lineStyle: {
                stroke: "#d9d9d9",
                lineWidth: 1,
                lineDash: [2, 2]
              }
            }}
          />
          <Legend offset={40} />
          <Geom
            type="polygon"
            position="x*y"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
            color={["count", "#BAE7FF-#1890FF-#0050B3"]}
          />
        </Chart>
      </div>
    );
  }
}

export default Hexagon;

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

class Rectangle extends React.Component {
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
    const dv = ds.createView("diamond").source(data);
    dv.transform({
      sizeByCount: "$state.sizeEncoding",
      // calculate bin size by binning count
      type: "bin.rectangle",
      fields: ["x", "y"],
      // 对应坐标轴上的一个点
      bins: [20, 10]
    });
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} forceFit>
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
          <Axis name="stockRange" visible={false} />
          <Geom
            type="polygon"
            position="x*y"
            color={["count", "#BAE7FF-#1890FF-#0050B3"]}
          />
        </Chart>
      </div>
    );
  }
}

export default Rectangle;

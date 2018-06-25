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

function getComponent(data) {
  var dv = new DataSet.View().source(data);
  dv.transform({
    sizeByCount: true,
    // calculate bin size by binning count
    type: "bin.rectangle",
    fields: ["x", "y"],
    // 对应坐标轴上的一个点
    bins: [20, 10]
  });

  class SliderChart extends React.Component {
    render() {
      return (
        <Chart height={window.innerHeight} data={dv} forceFit>
          <Legend offset={40} />
          <Axis />
          <Tooltip />
          <Geom
            type="polygon"
            position="x*y"
            color={["count", "#BAE7FF-#1890FF-#0050B3"]}
          />
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Rectbinsize extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Rectbinsize;

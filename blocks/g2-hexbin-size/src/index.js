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
  var dv = new DataSet.View().source(data).transform({
    sizeByCount: true,
    // calculate bin size by binning count
    type: "bin.hexagon",
    fields: ["x", "y"],
    // 对应坐标轴上的一个点
    bins: [10, 5]
  });

  class SliderChart extends React.Component {
    render() {
      return (
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
          <Tooltip showTitle={false} crosshairs={false} />
          <Geom
            type="polygon"
            position="x*y"
            color={["count", "#BAE7FF-#1890FF-#0050B3"]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Hexbinsize extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Hexbinsize;

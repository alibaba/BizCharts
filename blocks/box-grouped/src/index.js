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

class Grouped extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["SepalLength", "SepalWidth", "PetalLength", "PetalWidth"],
      // 展开字段集
      key: "type",
      value: "value"
    }).transform({
      type: "bin.quantile",
      field: "value",
      // 计算分为值的字段
      as: "_bin",
      // 保存分为值的数组字段
      groupBy: ["Species", "type"]
    });
    const colorMap = {
      "I. setosa": G2.Global.colors[0],
      "I. versicolor": G2.Global.colors[1],
      "I. virginica": G2.Global.colors[2]
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={[20, 120, 95]}
          forceFit
        >
          <Tooltip
            crosshairs={{
              type: "rect"
            }}
          />
          <Legend marker="circle" />
          <Geom
            type="schema"
            position="type*_bin"
            shape="box"
            color={[
              "Species",
              val => {
                return colorMap[val];
              }
            ]}
            style={[
              "Species",
              {
                stroke: "rgba(0, 0, 0, 0.45)",
                fill: val => {
                  return colorMap[val];
                },
                fillOpacity: 0.3
              }
            ]}
            adjust="dodge"
          />
        </Chart>
      </div>
    );
  }
}

export default Grouped;

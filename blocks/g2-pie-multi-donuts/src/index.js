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
  const dv = new DataSet.View().source(data);
  dv.transform({
    type: "fold",
    fields: ["小于5岁", "5至13岁", "14至17岁"],
    // 展开字段集
    key: "age",
    value: "count"
  }).transform({
    type: "percent",
    field: "count",
    dimension: "age",
    groupBy: ["state"],
    as: ["percent"]
  });

  class SliderChart extends React.Component {
    render() {
      return (
        <Chart height={window.innerHeight} data={dv} forceFit padding={0}>
          <Tooltip />
          <Facet
            type="list"
            cols={9}
            fields={["state"]}
            showTitle={false}
            padding={0}
            eachView={(view, facet) => {
              view.coord("theta", {
                radius: 0.8,
                innerRadius: 0.6
              });
              view
                .intervalStack()
                .position("percent")
                .color("age");
              view.guide().html({
                position: ["50%", "50%"],
                html:
                  '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">' +
                  facet.data[0].state +
                  "</div>",
                alignX: "middle",
                alignY: "middle"
              });
            }}
          />
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Piemultidonuts extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Piemultidonuts;

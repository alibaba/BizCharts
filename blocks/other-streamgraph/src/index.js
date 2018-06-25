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

class Streamgraph extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const { DataView } = DataSet;
    const dv = new DataView()
      .source(data)
      .transform({
        type: "fill-rows",
        groupBy: ["name"],
        orderBy: ["year"]
      })
      .transform({
        type: "impute",
        field: "n",
        method: "value",
        value: 0
      })
      .transform({
        type: "aggregate",
        fields: ["n"],
        operations: ["sum"],
        groupBy: ["year", "name"],
        orderBy: ["year"],
        as: ["count"]
      });
    const cols = {
      year: {
        tickInterval: 10,
        nice: false
      },
      count: {
        nice: false
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={[0, 140, 60, 50]}
          plotBackground={{
            stroke: "#ccc"
          }}
          forceFit
        >
          <Axis name="year" line={null} />
          <Axis
            name="count"
            line={null}
            tickLine={{
              length: 8
            }}
            subTickCount={10}
            subTickLine={{
              lineWidth: 1,
              // 子刻度线宽
              stroke: "#ddd",
              // 子刻度线颜色
              length: 5
            }}
            grid={null}
          />
          <Legend
            position="right"
            useHtml={true}
            title={{
              text: "图例可滚动"
            }}
            g2-legend-marker={{
              borderRadius: "none"
            }}
            g2-legend-title={{
              fontSize: "12px",
              fontWeight: 500,
              margin: 0,
              color: "#ff8800"
            }}
          />
          <Tooltip shared={false} crosshairs={false} inPlot={false} />
          <Geom
            type="area"
            position="year*count"
            color="name"
            adjust={["stack", "symmetric"]}
            shape="smooth"
            opacity={1}
          />
        </Chart>
      </div>
    );
  }
}

export default Streamgraph;

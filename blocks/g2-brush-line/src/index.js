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

import Brush from "@antv/g2-brush";

import data from "./mock.json";

function getComponent(data) {
  const { DataView } = DataSet;
  const dv = new DataView();
  dv.source(data).transform({
    type: "fold",
    key: "city",
    value: "value",
    fields: ["New York", "San Francisco", "Austin"]
  });
  const scale = {
    date: {
      type: "time"
    },
    value: {
      alias: "Temperature, ºF"
    }
  };
  let chart;

  class RenderChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart.get("canvas"),
        style: {
          fill: "#ccc",
          fillOpacity: 0.4
        },
        chart
      });
      chart.on("plotdblclick", () => {
        chart.get("options").filters = {};
        chart.repaint();
      });
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight}
            data={dv}
            padding={[60, 30, 30]}
            scale={scale}
            onGetG2Instance={g2Chart => {
              g2Chart.animate(false);
              chart = g2Chart;
            }}
            forceFit
          >
            <Axis
              name="date"
              line={{
                stroke: "#000"
              }}
              tickLine={{
                stroke: "#000",
                value: 6 // 刻度线长度
              }}
              label={{
                textStyle: {
                  textAlign: "start"
                }
              }}
            />
            <Axis
              name="value"
              grid={null}
              tickLine={{
                stroke: "#000",
                value: 6 // 刻度线长度
              }}
              label={{
                textStyle: {
                  fill: "#000"
                }
              }}
              line={{
                stroke: "#000"
              }}
            />
            <Legend position="top" />
            <Geom
              type="line"
              position="date*value"
              color="city"
              shape="spline"
              size={2}
            />
            <Geom
              type="area"
              position="time*rain"
              color="l(100) 0:#293c55 1:#f7f7f7"
              opacity={0.85}
            />
          </Chart>
        </div>
      );
    }
  }
  return RenderChart;
}

class Brushline extends React.Component {
  render() {
    const RenderChart = getComponent(data);
    return (
      <div>
        <RenderChart />
      </div>
    );
  }
}

export default Brushline;

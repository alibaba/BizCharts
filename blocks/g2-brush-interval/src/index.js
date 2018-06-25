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
  const ds = new DataSet();
  const dv = ds
    .createView("test")
    .source(data)
    .transform({
      as: ["count"],
      groupBy: ["release"],
      operations: ["count"],
      type: "aggregate"
    });
  const scale = {
    count: {
      alias: "top2000 唱片总量"
    },
    release: {
      tickInterval: 5,
      alias: "唱片发行年份"
    }
  };
  let chart;

  class SliderChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart.get("canvas"),
        chart,
        type: "X",

        onBrushstart() {
          chart.hideTooltip();
        },

        onBrushmove() {
          chart.hideTooltip();
        }
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
            scale={scale}
            onGetG2Instance={g2Chart => {
              chart = g2Chart;
            }}
            forceFit
          >
            <Tooltip />
            <Axis />
            <Geom type="interval" position="release*count" color="#e50000" />
          </Chart>
        </div>
      );
    }
  }
  return SliderChart;
}

class Brushinterval extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Brushinterval;

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

import Brush from "@antv/g2-brush";
import $ from "jquery";

import data from "./mock.json";

function getComponent(data) {
  const Util = G2.Util;
  const scale = {
    Species: {
      sync: true
    }
  };
  let chart;
  let brush;

  function setBrushType(type) {
    if (!brush) {
      brush = new Brush({
        canvas: chart.get("canvas"),
        dragable: true,
        type,

        onBrushstart(ev) {
          chart.hideTooltip();
          const { x, y } = ev;
          const views = chart.getViewsByPoint({
            x,
            y
          });

          if (views.length > 1) {
            this.chart = views[1];
            const coord = views[1].get("coord");
            this.plot = {
              start: coord.start,
              end: coord.end
            };
            this.xScale = views[1].getXScale();
            this.yScale = views[1].getYScales()[0];
          }
        },

        onBrushmove(ev) {
          chart.hideTooltip();
          const { data } = ev;
          chart.eachShape((record, shape) => {
            if (!shape.get("_originAttrs")) {
              shape.set("_originAttrs", Util.cloneDeep(shape.__attrs)); // 缓存原来的属性
            }

            if (data.indexOf(record) === -1) {
              shape.attr("fill", "#ccc");
            } else {
              const originAttrs = shape.get("_originAttrs");
              shape.__attrs = Util.cloneDeep(originAttrs);
            }
          });
        },

        onDragmove(ev) {
          chart.hideTooltip();
          const { data } = ev;
          chart.eachShape((record, shape) => {
            if (!shape.get("_originAttrs")) {
              shape.set("_originAttrs", Util.cloneDeep(shape.__attrs)); // 缓存原来的属性
            }

            if (data.indexOf(record) === -1) {
              shape.attr("fill", "#ccc");
            } else {
              const originAttrs = shape.get("_originAttrs");
              shape.__attrs = Util.cloneDeep(originAttrs);
            }
          });
        }
      });
    } else {
      if (type === "clear") {
        brush.container.clear(); // brush.canvas.draw();
      } else {
        brush.setType(type);
      }
    }
  }

  class RenderChart extends React.Component {
    componentDidMount() {
      $("#XY").click(() => {
        setBrushType("XY");
      });
      $("#Y").click(() => {
        setBrushType("Y");
      });
      $("#X").click(() => {
        setBrushType("X");
      });
      $("#POLYGON").click(() => {
        setBrushType("POLYGON");
      });
      $("#clear").click(() => {
        setBrushType("clear");
        chart.eachShape((record, shape) => {
          if (shape.get("_originAttrs")) {
            const originAttrs = shape.get("_originAttrs");
            shape.__attrs = Util.cloneDeep(originAttrs);
          }
        });
      });
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight}
            data={data}
            scale={scale}
            onGetG2Instance={g2Chart => {
              g2Chart.animate(false);
              chart = g2Chart;
            }}
            forceFit
          >
            <Axis name="rain" grid={null} />
            <Axis name="flow" title />
            <Tooltip />
            <Legend hoverable={false} />
            <Facet
              type="matrix"
              fields={[
                "SepalLength",
                "SepalWidth",
                "PetalLength",
                "PetalWidth"
              ]}
              eachView={(view, facet) => {
                view.axis(facet.colField, {
                  label: null,
                  line: {
                    lineWidth: 1,
                    stroke: "#000"
                  },
                  tickLine: {
                    lineWidth: 1,
                    stroke: "#000",
                    length: 4
                  }
                });
                view.axis(facet.rowField, {
                  label: null,
                  line: {
                    lineWidth: 1,
                    stroke: "#000"
                  },
                  tickLine: {
                    lineWidth: 1,
                    stroke: "#000",
                    length: 4
                  }
                });

                if (facet.rowIndex === facet.colIndex) {
                  view
                    .point()
                    .position(facet.colField + "*" + facet.colField)
                    .color("Species", ["#880000", "#008800", "#000088"])
                    .opacity(0.5)
                    .shape("circle")
                    .size(3)
                    .active(false);
                } else {
                  view
                    .point()
                    .position([facet.colField, facet.rowField])
                    .color("Species", ["#880000", "#008800", "#000088"])
                    .opacity(0.5)
                    .shape("circle")
                    .size(3)
                    .active(false);
                }

                if (
                  [0, 1, 2, 3].indexOf(facet.rowIndex) > -1 &&
                  facet.colIndex === 0
                ) {
                  view.guide().text({
                    position: [3.7, "median"],
                    content: facet.rowValue,
                    style: {
                      rotate: -90,
                      fontSize: 12,
                      fill: "#999",
                      textAlign: "center"
                    }
                  });
                }

                if (
                  [0, 1, 2, 3].indexOf(facet.colIndex) > -1 &&
                  facet.rowIndex === 3
                ) {
                  view.guide().text({
                    position: ["median", "min"],
                    content: facet.colValue,
                    style: {
                      fontSize: 12,
                      fill: "#999",
                      textAlign: "center"
                    },
                    offsetY: 20
                  });
                }
              }}
            />
          </Chart>
        </div>
      );
    }
  }
  return RenderChart;
}

class Brushhighlight extends React.Component {
  render() {
    const RenderChart = getComponent(data);
    return (
      <div>
        <RenderChart />
      </div>
    );
  }
}

export default Brushhighlight;

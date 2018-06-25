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

import data from "./mock.json";

class Calendarhorizontal extends React.Component {
  render() {
    Shape.registerShape("polygon", "boundary-polygon", {
      draw(cfg, container) {
        if (!Util.isEmpty(cfg.points)) {
          const attrs = {
            stroke: "#fff",
            lineWidth: 1,
            fill: cfg.color,
            fillOpacity: cfg.opacity
          };
          const points = cfg.points;
          const path = [
            ["M", points[0].x, points[0].y],
            ["L", points[1].x, points[1].y],
            ["L", points[2].x, points[2].y],
            ["L", points[3].x, points[3].y],
            ["Z"]
          ];
          attrs.path = this.parsePath(path);
          const polygon = container.addShape("path", {
            attrs
          });

          if (cfg.origin._origin.lastWeek) {
            const linePath = [
              ["M", points[2].x, points[2].y],
              ["L", points[3].x, points[3].y]
            ]; // 最后一周的多边形添加右侧边框

            container.addShape("path", {
              zIndex: 1,
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 1,
                stroke: "#404040"
              }
            });

            if (cfg.origin._origin.lastDay) {
              container.addShape("path", {
                zIndex: 1,
                attrs: {
                  path: this.parsePath([
                    ["M", points[1].x, points[1].y],
                    ["L", points[2].x, points[2].y]
                  ]),
                  lineWidth: 1,
                  stroke: "#404040"
                }
              });
            }
          }

          container.sort();
          return polygon;
        }
      }
    });
    const cols = {
      day: {
        type: "cat",
        values: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ]
      },
      week: {
        type: "cat"
      },
      commits: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          scale={cols}
          forceFit
          padding={[window.innerHeight / 3, 20, window.innerHeight / 3, 80]}
        >
          <Tooltip title="date" />
          <Axis
            name="week"
            position="top"
            tickLine={null}
            line={null}
            label={{
              offset: 12,
              textStyle: {
                fontSize: 12,
                fill: "#666",
                textBaseline: "top"
              },
              formatter: val => {
                if (val === "2") {
                  return "MAY";
                } else if (val === "6") {
                  return "JUN";
                } else if (val === "10") {
                  return "JUL";
                } else if (val === "15") {
                  return "AUG";
                } else if (val === "19") {
                  return "SEP";
                } else if (val === "24") {
                  return "OCT";
                }

                return "";
              }
            }}
          />
          <Axis name="day" grid={null} />
          <Geom
            type="polygon"
            position="week*day*date"
            shape="boundary-polygon"
            color={["commits", "#BAE7FF-#1890FF-#0050B3"]}
          />
          <Coord reflect="y" />
        </Chart>
      </div>
    );
  }
}

export default Calendarhorizontal;

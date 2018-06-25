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

class Waterfall extends React.Component {
  render() {
    function getRectPath(points) {
      const path = [];

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point) {
          const action = i === 0 ? "M" : "L";
          path.push([action, point.x, point.y]);
        }
      }

      const first = points[0];
      path.push(["L", first.x, first.y]);
      path.push(["z"]);
      return path;
    }

    function getFillAttrs(cfg) {
      const defaultAttrs = Shape.interval;
      const attrs = Util.mix(
        {},
        defaultAttrs,
        {
          fill: cfg.color,
          stroke: cfg.color,
          fillOpacity: cfg.opacity
        },
        cfg.style
      );
      return attrs;
    }

    Shape.registerShape("interval", "waterfall", {
      draw(cfg, container) {
        const attrs = getFillAttrs(cfg);
        let rectPath = getRectPath(cfg.points);
        rectPath = this.parsePath(rectPath);
        const interval = container.addShape("path", {
          attrs: Util.mix(attrs, {
            path: rectPath
          })
        });

        if (cfg.nextPoints) {
          let linkPath = [
            ["M", cfg.points[2].x, cfg.points[2].y],
            ["L", cfg.nextPoints[0].x, cfg.nextPoints[0].y]
          ];

          if (cfg.nextPoints[0].y === 0) {
            linkPath[1] = ["L", cfg.nextPoints[1].x, cfg.nextPoints[1].y];
          }

          linkPath = this.parsePath(linkPath);
          container.addShape("path", {
            attrs: {
              path: linkPath,
              stroke: "rgba(0, 0, 0, 0.45)",
              lineDash: [4, 2]
            }
          });
        }

        return interval;
      }
    });
    const data = [
      {
        type: "日用品",
        money: 300
      },
      {
        type: "伙食费",
        money: 900
      },
      {
        type: "交通费",
        money: 200
      },
      {
        type: "水电费",
        money: 300
      },
      {
        type: "房租",
        money: 1200
      },
      {
        type: "商场消费",
        money: 1000
      },
      {
        type: "应酬交际",
        money: 2000
      },
      {
        type: "总费用",
        money: 5900
      }
    ];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (i > 0 && i < data.length - 1) {
        if (Util.isArray(data[i - 1].money)) {
          item.money = [
            data[i - 1].money[1],
            item.money + data[i - 1].money[1]
          ];
        } else {
          item.money = [data[i - 1].money, item.money + data[i - 1].money];
        }
      }
    }
    return (
      <div>
        <Chart height={400} data={data} forceFit>
          <Legend
            custom={true}
            clickable={false}
            items={[
              {
                value: "各项花销",
                marker: {
                  symbol: "square",
                  fill: "#1890FF",
                  radius: 5
                }
              },
              {
                value: "总费cd用",
                marker: {
                  symbol: "square",
                  fill: "#8c8c8c",
                  radius: 5
                }
              }
            ]}
          />
          <Axis name="type" />
          <Axis name="money" />
          <Tooltip />
          <Geom
            type="interval"
            position="type*money"
            color={[
              "type",
              type => {
                if (type === "总费用") {
                  return "rgba(0, 0, 0, 0.65)";
                }

                return "#1890FF";
              }
            ]}
            tooltip={[
              "type*money",
              (type, money) => {
                if (Util.isArray(money)) {
                  return {
                    name: "生活费",
                    value: money[1] - money[0]
                  };
                }

                return {
                  name: "生活费",
                  value: money
                };
              }
            ]}
            shape="waterfall"
          />
        </Chart>
      </div>
    );
  }
}

export default Waterfall;

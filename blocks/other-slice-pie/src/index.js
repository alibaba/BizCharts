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

class Slicepie extends React.Component {
  render() {
    Shape.registerShape("interval", "burstPie", {
      getPoints(cfg) {
        var width = cfg.size;
        var x = cfg.x;
        var min = cfg.y[0];
        var max = cfg.y[1];
        var res = [];

        for (var i = 0; i < max; i += 0.1) {
          if (min > i) {
            continue;
          } else if (min < i && min > i - 0.1) {
            res.push(
              {
                x: x - width / 2,
                y: min
              },
              {
                x: x - width / 2,
                y: i - 0.01
              },
              {
                x: x + width / 2,
                y: i - 0.01
              },
              {
                x: x + width / 2,
                y: min
              }
            );
          }

          var start = i;
          var end = parseFloat(i + 0.1 > max ? max : i + 0.09);
          res.push(
            {
              x: x - width / 2,
              y: start
            },
            {
              x: x - width / 2,
              y: end
            },
            {
              x: x + width / 2,
              y: end
            },
            {
              x: x + width / 2,
              y: start
            }
          );
        }

        return res;
      },

      draw(cfg, container) {
        // 将归一化后的数据转换为画布上的坐标
        var points = cfg.origin.points;
        var path = [];

        for (var i = 0; i < cfg.origin.points.length; i += 4) {
          path.push(["M", points[i].x, points[i].y]);
          path.push(["L", points[i + 1].x, points[i + 1].y]);
          path.push(["L", points[i + 2].x, points[i + 2].y]);
          path.push(["L", points[i + 3].x, points[i + 3].y]);
          path.push(["L", points[i].x, points[i].y]);
          path.push(["z"]);
        }

        path = this.parsePath(path, true);
        var shape = container.addShape("path", {
          attrs: {
            fill: cfg.color || "#00D9DF",
            path
          }
        });
        return shape;
      }
    });
    const data = [
      {
        value: 0.5,
        key: "男"
      },
      {
        value: 0.4,
        key: "女"
      },
      {
        value: 0.1,
        key: "未知"
      }
    ];
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "value",
      dimension: "key",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          return val * 100 + "%";
        }
      }
    };
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} scale={cols} forceFit>
          <Coord type="theta" radius={0.8} innerRadius={0.7} />
          <Tooltip showTitle={false} />
          <Legend />
          <Axis
            name="percent"
            title={{
              offset: 40,
              text: "百分比"
            }}
          />
          <Geom
            type="intervalStack"
            shape="burstPie"
            position="percent"
            color={["key", ["#1890ff", "#f04864", "#bfbfbf"]]}
          />
        </Chart>
      </div>
    );
  }
}

export default Slicepie;

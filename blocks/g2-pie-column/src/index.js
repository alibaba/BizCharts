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

class Piecolumn extends React.Component {
  render() {
    const data = [
      {
        type: "分类一",
        value: 20
      },
      {
        type: "分类二",
        value: 18
      },
      {
        type: "分类三",
        value: 32
      },
      {
        type: "分类四",
        value: 15
      },
      {
        type: "Other",
        value: 15
      }
    ];
    let sum = 0;
    data.forEach(function(obj) {
      sum += obj.value;
    });
    const otherRatio = data[data.length - 1].value / sum; // Other 的占比

    const otherOffsetAngle = otherRatio * Math.PI; // other 占的角度的一半

    const chartWidth = window.innerWidth;
    const chartHeight = window.innerHeight;
    const others = [
      {
        otherType: "Other1",
        value: 2
      },
      {
        otherType: "Other2",
        value: 3
      },
      {
        otherType: "Other3",
        value: 5
      },
      {
        otherType: "Other4",
        value: 2
      },
      {
        otherType: "Other5",
        value: 3
      }
    ]; // 自定义 other 的图形，增加两条线

    G2.Shape.registerShape("interval", "otherShape", {
      draw(cfg, container) {
        const points = cfg.points;
        let path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y]);
        path.push(["L", points[2].x, points[2].y]);
        path.push(["L", points[3].x, points[3].y]);
        path.push("Z");
        path = this.parsePath(path); // 将点转换成画布上的点

        const parsePoints = this.parsePoints(points);
        const linePath = [
          ["M", parsePoints[3].x, parsePoints[3].y],
          ["L", chartWidth * 0.7, 20],
          ["M", parsePoints[2].x, parsePoints[2].y],
          ["L", chartWidth * 0.7, chartHeight - 70]
        ];
        console.log(linePath); // 绘制线

        container.addShape("path", {
          attrs: {
            path: linePath,
            stroke: cfg.color,
            lineWidth: 1
          }
        });
        return container.addShape("path", {
          attrs: {
            fill: cfg.color,
            path: path
          }
        });
      }
    });
    const scale2 = {
      value: {
        nice: false
      }
    };

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart
            height={chartHeight}
            weight={chartWidth}
            forceFit
            padding={[20, 0, "auto", 0]}
          >
            <Legend />
            <View
              data={data}
              start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 0.5,
                y: 1
              }}
            >
              <Coord
                type="theta"
                startAngle={0 + otherOffsetAngle}
                endAngle={Math.PI * 2 + otherOffsetAngle}
              />
              <Geom
                type="intervalStack"
                position="value"
                color="type"
                shape={[
                  "type",
                  function(type) {
                    if (type === "Other") {
                      return "otherShape";
                    }

                    return "rect";
                  }
                ]}
              >
                <Label
                  content="type"
                  offset={-20}
                  textStyle={{
                    rotate: 0
                  }}
                />
              </Geom>
            </View>
            <View
              data={others}
              scale={scale2}
              start={{
                x: 0.6,
                y: 0
              }}
              end={{
                x: 1,
                y: 1
              }}
            >
              <Geom
                type="intervalStack"
                position="1*value"
                color={["otherType", "#FCD7DE-#F04864"]}
              >
                <Label content="otherType" offset={-20} />
              </Geom>
            </View>
          </Chart>
        );
      }
    }
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Piecolumn;

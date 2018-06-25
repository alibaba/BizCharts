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

class Piesize extends React.Component {
  render() {
    const data = [
      {
        type: "分类一",
        value: 27
      },
      {
        type: "分类二",
        value: 25
      },
      {
        type: "分类三",
        value: 18
      },
      {
        type: "分类四",
        value: 15
      },
      {
        type: "分类五",
        value: 10
      },
      {
        type: "Other",
        value: 5
      }
    ];
    let max = 0;
    data.forEach(function(obj) {
      if (obj.value > max) {
        max = obj.value;
      }
    }); // 自定义 other 的图形，增加两条线

    G2.Shape.registerShape("interval", "sliceShape", {
      draw(cfg, container) {
        const points = cfg.points;
        const origin = cfg.origin._origin;
        const percent = origin.value / max;
        const xWidth = points[2].x - points[1].x;
        const width = xWidth * percent;
        let path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y]);
        path.push(["L", points[0].x + width, points[2].y]);
        path.push(["L", points[0].x + width, points[3].y]);
        path.push("Z");
        path = this.parsePath(path);
        return container.addShape("path", {
          attrs: {
            fill: cfg.color,
            path: path
          }
        });
      }
    });

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart height={window.innerHeight} data={data} forceFit>
            <Coord type="theta" radius={0.8} />
            <Tooltip />
            <Geom
              type="intervalStack"
              position="value"
              color="type"
              shape="sliceShape"
            >
              <Label content="type" />
            </Geom>
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

export default Piesize;

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

class Pieslice extends React.Component {
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
    ]; // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值

    const sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

    G2.Shape.registerShape("interval", "sliceShape", {
      draw(cfg, container) {
        const points = cfg.points;
        let path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y - sliceNumber]);
        path.push(["L", points[2].x, points[2].y - sliceNumber]);
        path.push(["L", points[3].x, points[3].y]);
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
            <Coord type="theta" innerRadius={0.75} />
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="value"
              color="type"
              shape="sliceShape"
            />
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

export default Pieslice;

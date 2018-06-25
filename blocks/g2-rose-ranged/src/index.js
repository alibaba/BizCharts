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

class Roseranged extends React.Component {
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

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart
            height={window.innerHeight}
            data={data}
            padding={[40, 0]}
            forceFit
          >
            <Axis />
            <Coord
              type="polar"
              startAngle={Math.PI}
              endAngle={Math.PI * (3 / 2)}
            />
            <Geom
              type="interval"
              position="type*value"
              color={["type", "rgb(252,143,72)-rgb(255,215,135)"]}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            >
              <Label
                content="value"
                offset={-15}
                label={{
                  textAlign: "center",
                  fill: "#000"
                }}
              />
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

export default Roseranged;

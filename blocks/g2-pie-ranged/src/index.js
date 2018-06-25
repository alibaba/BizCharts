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

class Pieranged extends React.Component {
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
            forceFit
            padding={[40, 0]}
          >
            <Coord
              type="theta"
              startAngle={Math.PI}
              endAngle={Math.PI * (3 / 2)}
            />
            <Tooltip />
            <Geom type="intervalStack" position="value" color="type">
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

export default Pieranged;

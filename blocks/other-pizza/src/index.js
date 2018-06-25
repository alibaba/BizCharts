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

class Pizza extends React.Component {
  render() {
    data.forEach(obj => {
      obj.type = "1";
    });
    const cols = {
      type: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          padding={[40, 100, 80, 80]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" />
          <Axis
            name="clarity"
            grid={{
              align: "center",
              lineStyle: {
                lineDash: [0, 0]
              }
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="pointJitter"
            position="clarity*type"
            color="clarity"
            shape="circle"
            opacity={0.65}
          />
        </Chart>
      </div>
    );
  }
}

export default Pizza;

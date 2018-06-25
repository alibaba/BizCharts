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

class Row extends React.Component {
  render() {
    const scale = {
      carat: {
        sync: true
      },
      price: {
        sync: true,
        tickCount: 3
      },
      clarity: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={450}
          data={data}
          padding={[30, 80, 80, 80]}
          scale={scale}
        >
          <Legend />
          <Facet
            type="rect"
            fields={[null, "clarity"]}
            eachView={(view, facet) => {
              view
                .point()
                .position("carat*price")
                .color("clarity")
                .shape("circle")
                .opacity(0.3)
                .size(3);
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Row;

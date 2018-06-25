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

class List extends React.Component {
  render() {
    const scale = {
      carat: {
        sync: true
      },
      price: {
        sync: true,
        tickCount: 3
      },
      cut: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={450}
          data={data}
          width={800}
          height={600}
          padding={[30, 80, 80, 80]}
          scale={scale}
        >
          <Legend />
          <Facet
            type="list"
            fields={["cut"]}
            cols={3}
            padding={30}
            eachView={(view, facet) => {
              view
                .point()
                .position("carat*price")
                .color("cut")
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

export default List;

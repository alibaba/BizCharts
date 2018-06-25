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

class Polarheatmap extends React.Component {
  render() {
    return (
      <div>
        <Chart height={window.innerHeight} data={data} padding={40} forceFit>
          <Tooltip showTitle={null} />
          <Coord type="polar" innerRadius={0.2} />
          <Axis name="week" grid={null} />
          <Axis
            name="time"
            grid={null}
            line={null}
            label={{
              offset: 3,
              textStyle: {
                textAlign: "left"
              }
            }}
          />
          <Geom
            type="polygon"
            position="time*week"
            color={["value", "#BAE7FF-#1890FF-#0050B3"]}
            tooltip="week*time*value"
            style={{
              stroke: "#ccc",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Polarheatmap;

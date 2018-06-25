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

import data from "./mock.json";

function getComponent(data) {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "diagram.voronoi",
    fields: ["x", "y"],
    size: [800, 600],
    as: ["_x", "_y"]
  });

  class SliderChart extends React.Component {
    render() {
      return (
        <Chart height={window.innerHeight} data={dv} padding={0} forceFit>
          <Tooltip showTitle={false} />
          <Coord type="polar" />
          <Geom type="polygon" position="_x*_y" color="value">
            <Label
              content="value"
              offset={0}
              textStyle={{
                fill: "#fff",
                fontSize: "12",
                textAlign: "center",
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          </Geom>
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Voronoipolar extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default Voronoipolar;

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

class Voronoi extends React.Component {
  render() {
    const { DataView } = DataSet;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "diagram.voronoi",
      fields: ["x", "y"],
      size: [800, 600],
      as: ["_x", "_y"]
    });
    return (
      <div>
        <Chart data={dv} forceFit={true} height={window.innerHeight}>
          <Tooltip showTitle={false} />
          <Geom type="polygon" position="_x*_y" color="value">
            <Label content="value" />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Voronoi;

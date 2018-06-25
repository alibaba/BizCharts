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

class Hotrect extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: "bin.rectangle",
      fields: ["carat", "price"]
    });
    return (
      <div>
        <Chart
          height={window.innerHeight}
          padding={[20, 80, 120, 85]}
          data={dv}
          forceFit
        >
          <Tooltip showTitle={false} />
          <Axis name="x" />
          <Axis name="y" />
          <Geom
            type="polygon"
            position="x*y"
            color={["count", ["#BAE7FF", "#1890FF", "#0050B3"]]}
          />
        </Chart>
      </div>
    );
  }
}

export default Hotrect;

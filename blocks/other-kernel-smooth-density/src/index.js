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

class Kernelsmoothdensity extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: "kernel-smooth.density",
      fields: ["carat", "price"],
      as: ["carat", "price", "density"]
    });
    return (
      <div>
        <Chart height={window.innerHeight} data={data} forceFit>
          <Axis name="price" />
          <Axis name="carat" />
          <Legend />
          <Geom type="point" position="carat*price" />
          <View data={dv}>
            <Geom
              type="heatmap"
              position="carat*price"
              color={["density", "blue-cyan-lime-yellow-red"]}
            />
          </View>
        </Chart>
      </div>
    );
  }
}

export default Kernelsmoothdensity;

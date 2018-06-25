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

class Kernelsmoothregression2 extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const cols = {
      carat: {
        alias: "克拉数",
        min: 0,
        max: 4,
        sync: true
      },
      price: {
        alias: "价格",
        sync: true
      }
    };
    return (
      <div>
        <Chart height={window.innerHeight} data={data} scale={cols} forceFit>
          <Geom type="point" position="carat*price" />
          <Axis name="carat" />
          <Axis name="price" />
          <Tooltip />
          {[
            "boxcar",
            "cosine",
            "epanechnikov",
            "gaussian",
            "quartic",
            "triangular",
            "tricube",
            "triweight",
            "uniform"
          ].map((method, i) => {
            const dv = new DataSet.View().source(data);
            dv.transform({
              type: "kernel-smooth.regression",
              method,
              fields: ["carat", "price"],
              as: ["carat", "price"],
              bandwidth: 0.5,
              extent: [0, 4]
            });
            return (
              <View data={dv}>
                <Geom
                  type="line"
                  position="carat*price"
                  color={G2.Global.colors_16[i]}
                />
              </View>
            );
          })}
        </Chart>
      </div>
    );
  }
}

export default Kernelsmoothregression2;

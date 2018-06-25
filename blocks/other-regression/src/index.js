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

class Regression extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const cols = {
      carat: {
        sync: true
      },
      price: {
        sync: true
      }
    };
    const REGRESSION_METHODS = [
      "linear",
      "exponential",
      "logarithmic",
      "power",
      "polynomial"
    ];
    return (
      <div>
        <Chart height={window.innerHeight} data={data} scale={cols} forceFit>
          <View data={data}>
            <Axis name="price" />
            <Axis name="carat" />
            <Geom type="point" position="carat*price" />
          </View>

          {REGRESSION_METHODS.map((method, i) => {
            const dv = new DataSet.View().source(data).transform({
              type: "regression",
              method,
              fields: ["carat", "price"],
              bandwidth: 0.1,
              extent: [0, 4],
              as: ["carat", "price"]
            });
            return (
              <View data={dv}>
                <Geom
                  type="line"
                  position="carat*price"
                  size={1}
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

export default Regression;

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

class Kernelsmoothregression1 extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const cols = {
      x: {
        alias: "depth",
        min: 50,
        max: 70,
        sync: true
      },
      y: {
        alias: "概率密度分布",
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          axis={false}
          scale={cols}
          forceFit
        >
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
              field: "depth",
              extent: [50, 70]
            });
            if (i == 0)
              return (
                <View data={dv}>
                  <Axis name="x" />
                  <Axis name="y" />
                  <Geom
                    type="line"
                    position="x*y"
                    color={G2.Global.colors_16[i]}
                  />
                </View>
              );
            else
              return (
                <View data={dv}>
                  <Geom
                    type="line"
                    position="x*y"
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

export default Kernelsmoothregression1;

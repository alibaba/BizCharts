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

class Periodictable extends React.Component {
  render() {
    const { Text, Line } = Guide;
    const dv = new DataSet.View().source(data, {
      type: "hex"
    });
    return (
      <div>
        <Chart height={window.innerHeight} data={data} forceFit>
          <Geom type="point" position="carat*price" />
          <Tooltip showTitle={false} />
          <View data={dv}>
            <Geom
              type="polygon"
              position="x*y"
              color="category"
              style={{
                stroke: "white",
                lineWidth: 2
              }}
              tooltip="symbol*name*number*atomic_mass*category"
            >
              <Label
                content="symbol"
                offset={0}
                textStyle={{
                  fontSize: window.innerHeight / 24,
                  fontWeight: 500
                }}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Periodictable;

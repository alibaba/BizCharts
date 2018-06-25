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

class Usstateshex extends React.Component {
  render() {
    const dv = new DataSet.View().source(data, {
      type: "hex",
      width: 100,
      height: 100
    });
    const scale = {
      x: {
        nice: false,
        sync: true
      },
      y: {
        nice: false,
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          scale={scale}
          padding={window.innerHeight / 24}
          forceFit
        >
          <Coord reflect />
          <Legend visible={false} />
          <Axis visible={false} />
          <Tooltip showTitle={false} />
          <View data={dv._gridRows}>
            <Geom
              type="polygon"
              tooltip="key"
              position="x*y"
              color="grey"
              opacity={0.5}
              style={{
                lineWidth: 1,
                stroke: "white"
              }}
            />
          </View>
          <View data={dv}>
            <Geom
              type="polygon"
              position="x*y"
              style={{
                lineWidth: 5,
                stroke: "white"
              }}
              color={G2.Global.colors[1]}
              tooltip="capital"
            >
              <Label
                content="key"
                offset={0}
                textStyle={{
                  fontSize: window.innerHeight / 18,
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

export default Usstateshex;

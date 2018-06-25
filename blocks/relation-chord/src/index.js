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

class Chord extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "graph",
      edges: d => d.links
    });
    dv.transform({
      type: "diagram.arc",
      sourceWeight: e => e.sourceWeight,
      targetWeight: e => e.targetWeight,
      weight: true,
      marginRatio: 0.3
    });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          data={data}
          forceFit={true}
          height={window.innerHeight}
          scale={scale}
        >
          <Tooltip showTitle={false} />
          <View data={dv.edges} axis={false}>
            <Coord type="polar" reflect="y" />
            <Geom
              type="edge"
              position="x*y"
              shape="arc"
              color="source"
              opacity={0.5}
              tooltip={"source*target*value"}
            />
          </View>
          <View data={dv.nodes} axis={false}>
            <Coord type="polar" reflect="y" />
            <Geom type="polygon" position="x*y" color="id">
              <Label
                content="name"
                labelEmit={true}
                textStyle={{
                  fill: "black"
                }}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Chord;

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

class Sankey extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "graph",
      edges: d => d.links
    });
    dv.transform({
      type: "diagram.sankey"
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
          <View data={dv.edges}>
            <Geom
              type="edge"
              position="x*y"
              shape="arc"
              color="#bbb"
              opacity={0.6}
              tooltip={"value"}
            />
          </View>
          <View data={dv.nodes}>
            <Geom
              type="polygon"
              position="x*y"
              color="name"
              style={{
                stroke: "#ccc"
              }}
            />
          </View>
        </Chart>
      </div>
    );
  }
}

export default Sankey;

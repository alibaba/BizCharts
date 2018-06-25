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

class Adjacency extends React.Component {
  render() {
    const { DataView } = DataSet;
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "hierarchy"
    });
    dv.transform({
      type: "hierarchy.partition"
    });
    const realData = dv.getAllNodes().map(node => ({
      name: node.data.name,
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y
    }));
    return (
      <div>
        <Chart data={realData} forceFit={true} height={window.innerHeight}>
          <Tooltip showTitle={false} />
          <Geom type="polygon" position="x*y" color="name" />
        </Chart>
      </div>
    );
  }
}

export default Adjacency;

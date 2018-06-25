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

class Sunburst extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data, {
      type: "hierarchy"
    }).transform({
      type: "hierarchy.partition",
      // 根据树形数据生成相邻层次图 Adjacency Diagram 布局
      field: "sum",
      as: ["x", "y"]
    });
    const source = [];
    const nodes = dv.getAllNodes();
    nodes.map(node => {
      if (node.depth === 0) {
        // 父节点不展示
        return;
      }

      const obj = {};
      obj.label = node.data.label;
      obj.sum = node.data.sum;
      obj.uv = node.data.uv;
      obj.value = node.value;
      obj.x = node.x;
      obj.y = node.y;
      source.push(obj);
      return node;
    });
    return (
      <div>
        <Chart data={source} forceFit={true} height={window.innerHeight}>
          <Coord type="polar" innerRadius={0.3} />
          <Tooltip showTitle={false} />
          <Geom
            type="polygon"
            position="x*y"
            active={false}
            color={["value", "#BAE7FF-#1890FF-#0050B3"]}
            style={{
              stroke: "#FFF",
              lineWidth: 1
            }}
            tooltip="label*sum"
          />
        </Chart>
      </div>
    );
  }
}

export default Sunburst;

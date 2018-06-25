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

class Circlepacking extends React.Component {
  render() {
    const dv = new DataSet.View().source(data, {
      type: "hierarchy"
    });
    dv.transform({
      type: "hierarchy.circle-packing"
    });
    const finalData = dv.getAllNodes().map(node => ({
      hasChildren: !!(node.data.children && node.data.children.length),
      name: node.data.name.split(/(?=[A-Z][^A-Z])/g).join("\n"),
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y,
      r: node.r
    }));
    const diameter = Math.min(window.innerWidth, window.innerHeight) - 20;
    return (
      <div>
        <Chart data={finalData} height={diameter} width={diameter} padding={0}>
          <Tooltip showTitle={false} />
          <Geom
            type="point"
            position="x*y"
            shape="circle"
            active={false}
            size={["r", r => r * diameter]}
            style={{
              stroke: "rgb(183, 55, 121)"
            }}
            color={[
              "r",
              "rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)"
            ]}
            tooltip="name"
          >
            <Label
              content="name"
              offset={0}
              textStyle={(text, item) => {
                if (item.point.hasChildren) {
                  return {
                    opacity: 0
                  };
                }

                return {
                  textBaseline: "middle",
                  fill: "grey",
                  fontSize: 9,
                  textAlign: "center"
                };
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Circlepacking;

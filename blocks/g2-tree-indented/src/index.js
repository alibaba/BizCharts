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

class Treeindented extends React.Component {
  render() {
    var dv = new DataSet.View().source(data, {
      type: "hierarchy",
      pureData: true
    });
    dv.transform({
      type: "hierarchy.indented",
      // this layout algorithm needs to use pure data
      direction: "LR",

      getHGap() {
        return 10;
      },

      getVGap() {
        return 10;
      },

      getHeight() {
        return 18;
      },

      getWidth(d) {
        return 18 * d.name.length;
      }
    });
    return (
      <div>
        <Chart
          forceFit={true}
          height={window.innerHeight}
          padding={[10, 60, 0, 20]}
        >
          <Coord reflect="y" />
          <Tooltip />
          <View
            data={dv.getAllLinks().map(link => ({
              x: [link.source.x, link.target.x],
              y: [link.source.y, link.target.y],
              source: link.source.id,
              target: link.target.id
            }))}
          >
            <Geom
              type="edge"
              position="x*y"
              shape="smooth"
              color="grey"
              opacity={0.5}
              tooltip="source*target"
            />
          </View>
          <View
            data={dv.getAllNodes().map(node => ({
              hasChildren: !!(node.children && node.children.length),
              name: node.data.name,
              value: node.value,
              depth: node.depth,
              side: node.side || "root",
              x: node.x,
              y: node.y
            }))}
          >
            <Geom type="point" position="x*y" color="hasChildren">
              <Label
                content="name"
                textStyle={(text, item) => {
                  var textAlign;

                  if (item.point.side === "left") {
                    textAlign = item.point.hasChildren ? "left" : "right";
                  } else {
                    textAlign = item.point.hasChildren ? "right" : "left";
                  }

                  return {
                    fill: "grey",
                    fontSize: 9,
                    textBaseline: "middle",
                    textAlign: textAlign
                  };
                }}
                offset={0}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Treeindented;

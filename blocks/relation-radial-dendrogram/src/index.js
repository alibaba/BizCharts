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

class Radialdendrogram extends React.Component {
  render() {
    const dv = new DataSet.View().source(data, {
      type: "hierarchy"
    });
    dv.transform({
      type: "hierarchy.cluster"
    });
    return (
      <div>
        <Chart
          forceFit={true}
          height={window.innerHeight}
          data
          padding={[60, 0, 40, 0]}
        >
          <Tooltip showTitle={false} />
          <Coord type="polar" />
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
              hasChildren: !!(node.data.children && node.data.children.length),
              name: node.data.name,
              value: node.value,
              depth: node.depth,
              x: node.x,
              y: node.y
            }))}
          >
            <Geom type="point" position="x*y" color="hasChildren">
              <Label
                content="name"
                labelEmit
                textStyle={(text, item) => {
                  let textAlign = item.textAlign;

                  if (item.point.hasChildren) {
                    textAlign = textAlign === "left" ? "right" : "left";
                  }

                  return {
                    fill: "grey",
                    fontSize: 9,
                    textAlign
                  };
                }}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Radialdendrogram;

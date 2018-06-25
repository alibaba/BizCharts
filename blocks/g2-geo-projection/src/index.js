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

import $ from "jquery";

import data from "./mock.json";

class Geoprojection extends React.Component {
  render() {
    const $projection = $("#projection");
    const ds = new DataSet({
      state: {
        projection: $projection.val()
      }
    });
    const dv = ds
      .createView("back")
      .source(data, {
        type: "GeoJSON"
      })
      .transform({
        type: "geo.projection",
        projection: "$state.projection",
        as: ["x", "y", "centroidX", "centroidY"]
      });
    const dvGraticule = ds
      .createView("graticule")
      .source({
        type: "geo-graticule"
      })
      .transform({
        type: "geo.projection",
        projection: "$state.projection",
        as: ["x", "y", "centroidX", "centroidY"]
      });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    $projection.on("change", () => {
      ds.setState("projection", $projection.val());
      setTimeout(() => {
        // console.log(dv, dvGraticule);
      }, 50);
    });
    return (
      <div>
        <Chart
          height={window.innerHeight - 32}
          padding={0}
          scale={scale}
          forceFit
          data={data}
        >
          <View data={dvGraticule}>
            <Coord reflect />
            <Geom
              type="polygon"
              position="x*y"
              style={{
                fill: null,
                stroke: "#ddd",
                lineWidth: 1
              }}
            />
          </View>
          <View data={dv}>
            <Coord reflect />
            <Geom
              type="polygon"
              position="x*y"
              style={{
                stroke: "#ddd",
                lineWidth: 1
              }}
            />
          </View>
        </Chart>
      </div>
    );
  }
}

export default Geoprojection;

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

class Waffleimage extends React.Component {
  render() {
    const data = [
      {
        name: "Internet Explorer",
        value: 26
      },
      {
        name: "Chrome",
        value: 40
      },
      {
        name: "Firefox",
        value: 30
      },
      {
        name: "Safari",
        value: 24
      },
      {
        name: "Opera",
        value: 15
      },
      {
        name: "Undetectable",
        value: 8
      }
    ];
    const imageMap = {
      "Internet Explorer":
        "https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png",
      Chrome:
        "https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png",
      Firefox:
        "https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png",
      Safari:
        "https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png",
      Opera:
        "https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png",
      Undetectable:
        "https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png"
    };
    const dv = new DataSet.View().source(data).transform({
      type: "waffle",
      rows: 10
    });
    return (
      <div>
        <Chart height={window.innerHeight} padding={20} forceFit data={dv}>
          <Geom
            type="point"
            position="x*y"
            color="name"
            shape={["name", name => ["image", imageMap[name]]]}
            size={(window.innerWidth - 40) / 20}
          />
        </Chart>
      </div>
    );
  }
}

export default Waffleimage;

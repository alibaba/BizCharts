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

class Helixcoordinate extends React.Component {
  render() {
    const data = [];
    const n = 31;

    for (let i = 0; i < 372; i++) {
      const now = Date();
      data[i] = {};
      data[i].time = new Date(now).getTime() + i * 1000 * 3600 * 24;
      const random = Math.floor(Math.random() * 10);

      if ((i % n > 2 && i % n < 4) || (i % n >= 6 && i % n < 7)) {
        data[i].value = 30 + random * 7;
      } else if (i % n >= 4 && i % n < 6) {
        data[i].value = 60 + random * 8;
      } else {
        data[i].value = 10 + random * 5;
      }
    }

    const cols = {
      time: {
        type: "timeCat",
        mask: "YYYY.MM.DD"
      },
      value: {
        min: 0
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          scale={cols}
          forceFit
          padding={[0, 60, 30, 0]}
        >
          <Coord
            type="helix"
            startAngle={0.5 * Math.PI}
            endAngle={12.5 * Math.PI}
          />
          <Axis name="time" line={null} />
          <Tooltip />
          <Geom
            type="interval"
            position="time*value"
            color={["value", "#ffffff-#1890FF"]}
            size={0.45}
          />
        </Chart>
      </div>
    );
  }
}

export default Helixcoordinate;

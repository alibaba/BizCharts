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

class Basic extends React.Component {
  render() {
    const data = [
      {
        year: "1991",
        value: 15468
      },
      {
        year: "1992",
        value: 16100
      },
      {
        year: "1993",
        value: 15900
      },
      {
        year: "1994",
        value: 17409
      },
      {
        year: "1995",
        value: 17000
      },
      {
        year: "1996",
        value: 31056
      },
      {
        year: "1997",
        value: 31982
      },
      {
        year: "1998",
        value: 32040
      },
      {
        year: "1999",
        value: 33233
      }
    ];
    const cols = {
      value: {
        min: 10000
      },
      year: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={window.innerHeight} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis
            name="value"
            label={{
              formatter: val => {
                return (val / 10000).toFixed(1) + "k";
              }
            }}
          />
          <Tooltip
            crosshairs={{
              type: "line"
            }}
          />
          <Geom type="area" position="year*value" />
          <Geom type="line" position="year*value" size={2} />
        </Chart>
      </div>
    );
  }
}

export default Basic;

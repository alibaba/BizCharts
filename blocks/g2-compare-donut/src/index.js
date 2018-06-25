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

class Comparedonut extends React.Component {
  render() {
    const data = [
      {
        year: 2007,
        area: "亚太地区",
        profit: 7860 * 0.189
      },
      {
        year: 2007,
        area: "非洲及中东",
        profit: 7860 * 0.042
      },
      {
        year: 2007,
        area: "拉丁美洲",
        profit: 7860 * 0.025
      },
      {
        year: 2007,
        area: "中欧和东欧",
        profit: 7860 * 0.018
      },
      {
        year: 2007,
        area: "西欧",
        profit: 7860 * 0.462
      },
      {
        year: 2007,
        area: "北美",
        profit: 7860 * 0.265
      },
      {
        year: 2011,
        area: "亚太地区",
        profit: 7620 * 0.539
      },
      {
        year: 2011,
        area: "非洲及中东",
        profit: 7620 * 0.065
      },
      {
        year: 2011,
        area: "拉丁美洲",
        profit: 7620 * 0.065
      },
      {
        year: 2011,
        area: "中欧和东欧",
        profit: 7620 * 0.034
      },
      {
        year: 2011,
        area: "西欧",
        profit: 7620 * 0.063
      },
      {
        year: 2011,
        area: "北美",
        profit: 7620 * 0.234
      }
    ];
    const { DataView } = DataSet;
    const cols = {
      percent: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };
    let id = 0;
    return (
      <div>
        <Chart height={window.innerHeight} data={data} padding={80} forceFit>
          <Tooltip showTitle={false} />
          <Legend offsetY={60} />
          <Facet
            type="rect"
            fields={["year"]}
            padding={50}
            colTitle={{
              offsetY: -30,
              style: {
                fontSize: 18,
                textAlign: "center",
                fill: "#999"
              }
            }}
            eachView={(view, facet) => {
              const data = facet.data;
              const dv = new DataView();
              dv.source(data).transform({
                type: "percent",
                field: "profit",
                dimension: "area",
                as: "percent"
              });
              view.source(dv, {
                percent: {
                  formatter: val => {
                    return (val * 100).toFixed(2) + "%";
                  }
                }
              });
              view.coord("theta", {
                innerRadius: 0.35
              });
              view
                .intervalStack()
                .position("percent")
                .color("area")
                .label("percent", {
                  offset: -8
                })
                .style({
                  lineWidth: 1,
                  stroke: "#fff"
                });
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Comparedonut;

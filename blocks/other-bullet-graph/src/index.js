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

class Bulletgraph extends React.Component {
  render() {
    const { Region } = Guide;
    const data = [
      {
        title: "Revenue",
        subtitle: "US$, in thousands",
        ranges: [150, 225, 300],
        actual: 270,
        target: 250
      },
      {
        title: "Profit",
        subtitle: "%",
        ranges: [20, 25, 30],
        actual: 23,
        target: 26
      },
      {
        title: "Order Size",
        subtitle: "US$, average",
        ranges: [350, 500, 600],
        actual: 100,
        target: 550
      },
      {
        title: "New Customers",
        subtitle: "count",
        ranges: [1400, 2000, 2500],
        actual: 1650,
        target: 2100
      },
      {
        title: "Satisfaction",
        subtitle: "out of 5",
        ranges: [3.5, 4.25, 5],
        actual: 3.2,
        target: 4.4
      }
    ];
    let y = 0;
    const yGap = 0.1;
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={[1]}
          padding={[100, 150]}
          forceFit
        >
          <Legend
            custom
            clickable={false}
            items={[
              {
                value: "差",
                fill: "#FFA39E",
                marker: "square"
              },
              {
                value: "良",
                fill: "#FFD591",
                marker: "square"
              },
              {
                value: "优",
                fill: "#A7E8B4",
                marker: "square"
              },
              {
                value: "实际值",
                fill: "#223273",
                marker: "square"
              },
              {
                value: "目标值",
                fill: "#262626",
                marker: {
                  symbol: "line",
                  stroke: "#262626",
                  radius: 5
                }
              }
            ]}
          />
          {data.map(data => {
            const ranges = data.ranges;
            const cols = {
              actual: {
                min: 0,
                max: ranges[2],
                nice: false
              },
              target: {
                min: 0,
                max: ranges[2],
                nice: false
              }
            };
            return (
              <View
                start={{
                  x: 0,
                  y: y
                }}
                end={{
                  x: 1,
                  y: y + yGap
                }}
                data={[data]}
                scale={cols}
              >
                <Coord transpose />
                <Axis name="actual" position="right" />
                <Axis name="target" visible={false} />
                <Geom
                  type="point"
                  position="title*target"
                  color="#square"
                  shape="line"
                  size={12}
                  style={{
                    lineWidth: 2
                  }}
                />
                <Geom
                  type="interval"
                  position="title*actual"
                  color="#223273"
                  size={15}
                />
                <Guide>
                  <Region
                    start={[-1, 0]}
                    end={[1, ranges[0]]}
                    style={{
                      fill: "#FFA39E",
                      fillOpacity: 0.85
                    }}
                  />
                  <Region
                    start={[-1, ranges[0]]}
                    end={[1, ranges[1]]}
                    style={{
                      fill: "#FFD591",
                      fillOpacity: 0.85
                    }}
                  />
                  <Region
                    start={[-1, ranges[1]]}
                    end={[1, ranges[2]]}
                    style={{
                      fill: "#A7E8B4",
                      fillOpacity: 0.85
                    }}
                  />
                </Guide>
                <Tooltip />
                {(y += yGap + 0.125)}
              </View>
            );
          })}
        </Chart>
      </div>
    );
  }
}

export default Bulletgraph;

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

class Comparision extends React.Component {
  render() {
    const expectData = [
      {
        value: 100,
        name: "展现"
      },
      {
        value: 80,
        name: "点击"
      },
      {
        value: 60,
        name: "访问"
      },
      {
        value: 40,
        name: "咨询"
      },
      {
        value: 30,
        name: "订单"
      }
    ];
    const actualData = [
      {
        value: 80,
        name: "展现"
      },
      {
        value: 50,
        name: "点击"
      },
      {
        value: 30,
        name: "访问"
      },
      {
        value: 10,
        name: "咨询"
      },
      {
        value: 5,
        name: "订单"
      }
    ];
    return (
      <div>
        <Chart
          data={[1]}
          height={window.innerHeight}
          padding={[20, 120, 95]}
          forceFit
        >
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Coord type="rect" transpose scale={[1, -1]} />
          <View data={expectData}>
            <Geom
              type="intervalSymmetric"
              position="name*value"
              shape="pyramid"
              color={[
                "name",
                ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
              ]}
              tooltip={[
                "name*value",
                (name, value) => {
                  return {
                    name: "预期" + name,
                    value
                  };
                }
              ]}
              opacity={0.65}
            >
              <Label
                content="name"
                offset={35}
                labeLine={{
                  lineWidth: 1,
                  stroke: "rgba(0, 0, 0, 0.15)"
                }}
              />
            </Geom>
          </View>
          <View data={actualData}>
            <Geom
              type="intervalSymmetric"
              position="name*value"
              shape="pyramid"
              color={[
                "name",
                ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
              ]}
              tooltip={[
                "name*value",
                (name, value) => {
                  return {
                    name: "实际" + name,
                    value
                  };
                }
              ]}
              opacity={1}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            />
          </View>
        </Chart>
      </div>
    );
  }
}

export default Comparision;

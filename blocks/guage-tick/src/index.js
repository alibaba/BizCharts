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

class Tick extends React.Component {
  render() {
    const { Arc, Html, Text } = Guide; // 极坐标下的柱状图
    // 构造数据

    const data1 = [];

    for (let i = 0; i < 50; i++) {
      const item = {};
      item.type = i + "";
      item.value = 10;
      data1.push(item);
    }

    const data2 = [];

    for (let i = 0; i < 50; i++) {
      const item = {};
      item.type = i + "";
      item.value = 10;

      if (i === 25) {
        item.value = 14;
      }

      if (i > 25) {
        item.value = 0;
      }

      data2.push(item);
    }

    const cols = {
      type: {
        range: [0, 1]
      },
      value: {
        sync: true
      }
    };
    const colsView2 = {
      type: {
        tickCount: 3
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={[1]}
          scale={cols}
          padding={[0, 0, 200, 0]}
          forceFit
        >
          <View data={data1}>
            <Coord
              type="polar"
              startAngle={(-9 / 8) * Math.PI}
              endAngle={(1 / 8) * Math.PI}
              radius={0.8}
              innerRadius={0.75}
            />
            <Geom
              type="interval"
              position="type*value"
              color="rgba(0, 0, 0, 0.09)"
              size={6}
            />
          </View>
          <View data={data1} scale={colsView2}>
            <Coord
              type="polar"
              startAngle={(-9 / 8) * Math.PI}
              endAngle={(1 / 8) * Math.PI}
              radius={0.55}
              innerRadius={0.95}
            />
            <Geom
              type="interval"
              position="type*value"
              color="rgba(0, 0, 0, 0.09)"
              size={6}
            />
            <Axis
              name="type"
              grid={null}
              line={null}
              tickLine={null}
              label={{
                offset: -20,
                textStyle: {
                  fontSize: 18,
                  fill: "#CBCBCB",
                  textAlign: "center"
                },
                formatter: val => {
                  if (val === "49") {
                    return 50;
                  }

                  return val;
                }
              }}
            />
            <Axis name="value" visible={false} />
          </View>
          <View data={data2}>
            <Coord
              type="polar"
              startAngle={(-9 / 8) * Math.PI}
              endAngle={(1 / 8) * Math.PI}
              radius={0.8}
              innerRadius={0.75}
            />
            <Geom
              type="interval"
              position="type*value"
              color={["value", "#3023AE-#53A0FD"]}
              opacity={1}
              size={6}
            />
            <Guide>
              <Text
                position={["50%", "65%"]}
                content="26°"
                style={{
                  fill: "#262626",
                  fontSize: 64,
                  textAlign: "center",
                  textBaseline: "middle"
                }}
              />
            </Guide>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Tick;

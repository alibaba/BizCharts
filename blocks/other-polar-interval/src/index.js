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

class Polarinterval extends React.Component {
  render() {
    const data = [
      {
        country: "中国",
        cost: 96
      },
      {
        country: "德国",
        cost: 121
      },
      {
        country: "美国",
        cost: 100
      },
      {
        country: "日本",
        cost: 111
      },
      {
        country: "韩国",
        cost: 102
      },
      {
        country: "法国",
        cost: 124
      },
      {
        country: "意大利",
        cost: 123
      },
      {
        country: "荷兰",
        cost: 111
      },
      {
        country: "比利时",
        cost: 123
      },
      {
        country: "英国",
        cost: 109
      },
      {
        country: "加拿大",
        cost: 115
      },
      {
        country: "俄罗斯",
        cost: 99
      },
      {
        country: "墨西哥",
        cost: 91
      },
      {
        country: "印度",
        cost: 87
      },
      {
        country: "瑞士",
        cost: 125
      },
      {
        country: "澳大利亚",
        cost: 130
      },
      {
        country: "西班牙",
        cost: 109
      },
      {
        country: "巴西",
        cost: 123
      },
      {
        country: "泰国",
        cost: 91
      },
      {
        country: "印尼",
        cost: 83
      },
      {
        country: "波兰",
        cost: 101
      },
      {
        country: "瑞典",
        cost: 116
      },
      {
        country: "奥地利",
        cost: 111
      },
      {
        country: "捷克",
        cost: 107
      }
    ];
    const cols = {
      cost: {
        min: 0
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          scale={cols}
          padding={[40, 40, 130, 40]}
          forceFit
        >
          <Coord type="polar" />
          <Axis
            name="cost"
            label={null}
            tickLine={null}
            line={{
              stroke: "#E9E9E9",
              lineDash: [3, 3]
            }}
          />
          <Axis
            name="country"
            grid={{
              align: "center"
            }}
            tickLine={null}
            label={{
              Offset: 10,
              textStyle: {
                textAlign: "center" // 设置坐标轴 label 的文本对齐方向
              }
            }}
          />
          <Legend name="country" itemWidth={50} />
          <Tooltip />
          <Geom
            type="interval"
            position="country*cost"
            color="country"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="cost"
              offset={-15}
              textStyle={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 11
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Polarinterval;

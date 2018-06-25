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

class Pyramid extends React.Component {
  render() {
    const { Text } = Guide;
    let data = [
      {
        action: "浏览网站",
        pv: 50000
      },
      {
        action: "放入购物车",
        pv: 35000
      },
      {
        action: "生成订单",
        pv: 25000
      },
      {
        action: "支付订单",
        pv: 15000
      },
      {
        action: "完成交易",
        pv: 8000
      }
    ];
    const cols = {
      percent: {
        nice: false
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          scale={cols}
          padding={[20, 120, 95]}
          forceFit
        >
          <Tooltip />
          <Coord type="rect" transpose scale={[1, -1]} />
          <Legend />
          <Geom
            type="intervalSymmetric"
            position="action*pv"
            shape="pyramid"
            color={[
              "action",
              ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
            ]}
          >
            <Label
              content={[
                "action*pv",
                (action, pv) => {
                  return action + " " + pv;
                }
              ]}
              offset={35}
              labeLine={{
                lineWidth: 1,
                stroke: "rgba(0, 0, 0, 0.15)"
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Pyramid;

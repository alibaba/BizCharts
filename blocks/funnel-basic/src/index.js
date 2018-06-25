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

class Basic extends React.Component {
  render() {
    const { Text } = Guide;
    const { DataView } = DataSet;
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
    const dv = new DataView().source(data);
    dv.transform({
      type: "percent",
      field: "pv",
      dimension: "action",
      as: "percent"
    });
    data = dv.rows;
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
          <Tooltip
            showTitle={false}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>浏览人数：{pv}</span><br/><span style=&quot;padding-left: 16px&quot;>占比：{percent}</span><br/></li>"
          />
          <Coord type="rect" transpose scale={[1, -1]} />
          <Legend />
          <Guide>
            {data.map(obj => {
              return (
                <Text
                  top={true}
                  position={{
                    action: obj.action,
                    percent: "median"
                  }}
                  content={parseInt(obj.percent * 100) + "%"}
                  style={{
                    fill: "#fff",
                    fontSize: "12",
                    textAlign: "center",
                    shadowBlur: 2,
                    shadowColor: "rgba(0, 0, 0, .45)"
                  }}
                />
              );
            })}
          </Guide>
          <Geom
            type="intervalSymmetric"
            position="action*percent"
            shape="funnel"
            color={[
              "action",
              ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
            ]}
            tooltip={[
              "action*pv*percent",
              (action, pv, percent) => {
                return {
                  name: action,
                  percent: parseInt(percent * 100) + "%",
                  pv: pv
                };
              }
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

export default Basic;

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

class Symmetric extends React.Component {
  render() {
    const { Text } = Guide;
    const data = [
      {
        action: "访问",
        visitor: 500,
        site: "站点1"
      },
      {
        action: "浏览",
        visitor: 400,
        site: "站点1"
      },
      {
        action: "交互",
        visitor: 300,
        site: "站点1"
      },
      {
        action: "下单",
        visitor: 200,
        site: "站点1"
      },
      {
        action: "完成",
        visitor: 100,
        site: "站点1"
      },
      {
        action: "访问",
        visitor: 550,
        site: "站点2"
      },
      {
        action: "浏览",
        visitor: 420,
        site: "站点2"
      },
      {
        action: "交互",
        visitor: 280,
        site: "站点2"
      },
      {
        action: "下单",
        visitor: 150,
        site: "站点2"
      },
      {
        action: "完成",
        visitor: 80,
        site: "站点2"
      }
    ];
    data.sort(function(obj1, obj2) {
      // 从小到大
      return obj1.visitor - obj2.visitor;
    });
    let id = 0;
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          axis={false}
          padding={[30, 120, 95]}
          forceFit
        >
          <Tooltip
            showTitle={false}
            crosshairs={false}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>{value}</span></li>"
          />
          <Legend reversed={true} />
          <Facet
            type="mirror"
            fields={["site"]}
            transpose={true}
            padding={0}
            eachView={(view, facet) => {
              view
                .interval()
                .position("action*visitor")
                .color("action", [
                  "#BAE7FF",
                  "#69C0FF",
                  "#40A9FF",
                  "#1890FF",
                  "#0050B3"
                ])
                .shape("funnel")
                .tooltip("site*action*visitor", (site, action, visitor) => {
                  return {
                    name: site,
                    value: action + ": " + visitor
                  };
                })
                .style({
                  lineWidth: 1,
                  stroke: "#fff"
                });
              data.map(obj => {
                if (obj.site === facet.colValue) {
                  view.guide().text({
                    top: true,
                    position: [obj.action, "min"],
                    content: obj.visitor,
                    style: {
                      fill: "#fff",
                      fontSize: "12",
                      textAlign: facet.colIndex ? "start" : "end",
                      shadowBlur: 2,
                      shadowColor: "rgba(0, 0, 0, .45)"
                    },
                    offsetX: facet.colIndex ? 10 : -10
                  });
                }
              });
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Symmetric;

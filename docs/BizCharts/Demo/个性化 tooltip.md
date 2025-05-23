# 个性化 tooltip

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77d9b3b0-9979-11ea-9761-adf4e02ffa04.png)

```js
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
} from "bizcharts@3.5.8";

class Cutomizetooltip extends React.Component {
  render() {
    const data = [
      {
        month: "一月",
        tem: 7,
        city: "tokyo"
      },
      {
        month: "二月",
        tem: 6.9,
        city: "tokyo"
      },
      {
        month: "三月",
        tem: 9.5,
        city: "tokyo"
      },
      {
        month: "四月",
        tem: 14.5,
        city: "tokyo"
      },
      {
        month: "五月",
        tem: 18.2,
        city: "tokyo"
      },
      {
        month: "六月",
        tem: 21.5,
        city: "tokyo"
      },
      {
        month: "七月",
        tem: 25.2,
        city: "tokyo"
      },
      {
        month: "八月",
        tem: 26.5,
        city: "tokyo"
      },
      {
        month: "九月",
        tem: 23.3,
        city: "tokyo"
      },
      {
        month: "十月",
        tem: 18.3,
        city: "tokyo"
      },
      {
        month: "十一月",
        tem: 13.9,
        city: "tokyo"
      }
    ];
    return (
      <div>
        <Chart data={data} forceFit>
          <Axis name="month" />
          <Axis name="tem" />
          <Tooltip
            containerTpl="<div class=&quot;g2-tooltip&quot;><p class=&quot;g2-tooltip-title&quot;></p><table class=&quot;g2-tooltip-list&quot;></table></div>"
            itemTpl="<tr class=&quot;g2-tooltip-list-item&quot;><td style=&quot;color:{color}&quot;>{name}</td><td>{value}</td></tr>"
            offset={50}
            g2-tooltip={{
              position: "absolute",
              visibility: "hidden",
              border: "1px solid #efefef",
              backgroundColor: "white",
              color: "#000",
              opacity: "0.8",
              padding: "5px 15px",
              transition: "top 200ms,left 200ms"
            }}
            g2-tooltip-list={{
              margin: "10px"
            }}
          />
          <Geom type="line" position="month*tem" />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Cutomizetooltip />, mountNode)

```

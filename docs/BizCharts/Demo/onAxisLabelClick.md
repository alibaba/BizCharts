# onAxisLabelClick

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/e7621570-28a2-11eb-85d9-95fcbab24c56.png)

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
  Util,
} from "bizcharts@3.5.8";
import _ from "lodash";

class Basic extends React.Component {
  render() {
    const data = [
      {
        year: "1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 3.5,
      },
      {
        year: "1994",
        value: 5,
      },
      {
        year: "1995",
        value: 4.9,
      },
      {
        year: "1996",
        value: 6,
      },
      {
        year: "1997",
        value: 7,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 13,
      },
    ];
    const cols = {
      value: {
        min: 0,
        range: [0, 0.93],
        alias: "次",
      },
      year: {
        range: [0, 0.9],
        alias: "时间",
      },
    };
    return (
      <div>
        <Chart
          height={400}
          data={data}
          scale={cols}
          forceFit
          onAxisLabelClick={(ev) => {
						// ev.target._attrs.text
            const curText = _.get(ev, "target._attrs.text", '');
          
            console.log("event", ev);
            console.log("curText", curText);
            
          }}
        >
          <Axis name="year" title />
          <Axis name="value" title />
          <Tooltip
            crosshairs={{
              type: "y",
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape="circle"
            style={{
              stroke: "#fff",
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Basic />, mountNode);

```

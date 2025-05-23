# Pizza Chart

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77ef85a0-9979-11ea-a591-9be663db1ad5.png)

```js
import $ from "jquery";
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

let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/other-pizza/0.2.8/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

class Pizza extends React.Component {
  render() {
    data.forEach(obj => {
      obj.type = "1";
    });
    const cols = {
      type: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={data}
          padding={[40, 100, 80, 80]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" />
          <Axis
            name="clarity"
            grid={{
              align: "center",
              lineStyle: {
                lineDash: [0, 0]
              }
            }}
          />
          <Tooltip showTitle={false} />
          <Geom
            type="pointJitter"
            position="clarity*type"
            color="clarity"
            shape="circle"
            opacity={0.65}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Pizza />, mountNode)

```

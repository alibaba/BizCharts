# list分面

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77c938f0-9979-11ea-9761-adf4e02ffa04.png)

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
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/facet-list/0.3.1/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

class List extends React.Component {
  render() {
    const scale = {
      carat: {
        sync: true
      },
      price: {
        sync: true,
        tickCount: 3
      },
      cut: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          height={450}
          data={data}
          width={800}
          padding={[30, 80, 80, 80]}
          scale={scale}
        >
          <Legend />
          <Facet
            type="list"
            fields={["cut"]}
            cols={3}
            padding={30}
            eachView={(view, facet) => {
              view
                .point()
                .position("carat*price")
                .color("cut")
                .shape("circle")
                .opacity(0.3)
                .size(3);
            }}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<List />, mountNode)

```

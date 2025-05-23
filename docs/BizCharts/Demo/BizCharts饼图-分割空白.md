# BizCharts饼图-分割空白

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77e17be0-9979-11ea-bd36-0f0eda3e7ac1.png)

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

class Pietexture extends React.Component {
  render() {
    var data = [
      {
        sex: "男",
        sold: 0.45
      },
      {
        sex: "女",
        sold: 0.55
      }
    ];

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart height={window.innerHeight} data={data} forceFit>
            <Coord type="theta" radius={0.8} />
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="sold"
              style={[
                "sex",
                {
                  fill: function(sex) {
                    if (sex === "男") {
                      return "p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg";
                    }

                    return "p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg";
                  }
                }
              ]}
            >
              <Label content="sex" />
            </Geom>
          </Chart>
        );
      }
    }
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

ReactDOM.render(<Pietexture />, mountNode)

```

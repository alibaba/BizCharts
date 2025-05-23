# 基础BizCharts饼图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77afbd80-9979-11ea-9761-adf4e02ffa04.png)

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

class Pieslice extends React.Component {
  render() {
    const data = [
      { name: 'IE', value: 56.33 },
      { name: 'Chrome', value: 24.03 },
      { name: 'Firefox', value: 10.38 },
      { name: 'Safari', value: 4.77 },
      { name: 'Opera', value: 0.91 },
      { name: 'Unknown', value: 0.2 },
    ];

    class SliderChart extends React.Component {
      render() {
        return (
          <Chart
            data={data}
            forceFit
            onIntervalClick={ev => {
              const data = ev.data;
              if (data) {
                const name = data._origin['name'];
                window.open('http://www.baidu.com/s?wd=' + name);
              }
            }}
          >
            <Coord type="theta"/>
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="value"
              color="name"
            >
              <Label content="name" />
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

ReactDOM.render(<Pieslice />, mountNode)

```

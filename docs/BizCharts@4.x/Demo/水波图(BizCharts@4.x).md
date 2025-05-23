# 水波图(BizCharts@4.x)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/20620d90-d30b-11eb-985f-8b0d2837a174.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from "react";
import {
  Chart,
  Tooltip,
  Interval,
  Effects,
  Legend,
  Guide,
  Axis,
} from "bizcharts";

const { Text } = Guide;

const data = [
  {
    gender: "male",
    value: 50,
  },
];

const scale = {
  value: {
    min: 0,
    max: 100,
  },
};
class Demo extends React.Component {
  render() {
    return (
      <Chart data={data} width={200} height={200} padding={0} scale={scale}>
        <Tooltip />
        <Axis visible={false} />
        <Interval
          position="gender*value"
          color="gender"
          shape="liquid-fill-gauge"
          style={{
            lineWidth: 10,
            fillOpacity: 0.75,
          }}
          size={160}
          customInfo={{}}
        />
        <Legend visible={false} />
        <Effects>
          {(chart) => {
            chart.geometries[0].customInfo({
              radius: 0.9,
              outline: { border: 2, distance: 0 },
              wave: { count: 3, length: 192 },
            });
          }}
        </Effects>
        <Guide>
          {data.map((row) => (
            <Text
              content={`${row.value}%`}
              top
              position={{
                gender: row.gender,
                value: 50,
              }}
              style={{
                opacity: 0.75,
                fontSize: window.innerWidth / 60,
                textAlign: "center",
              }}
            />
          ))}
        </Guide>
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode);

```

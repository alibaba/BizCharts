# 雷达图复杂曲线（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/c3ec3a30-afa3-11ea-af03-e39c6df319e0.png)

```js
import $ from "jquery";
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Geom, Coordinate } from 'bizcharts';
let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/radar-flower-line/0.1.2/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const scale = {
  x: {
    tickInterval: 30,
  },
};

class RadarFlowerLine extends React.Component {
  constructor() {
    super();
    this.state = {
      coordType: 'polar',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        coordType: 'rect',
      });
    }, 2000);
  }

  render() {
    return (
      <Chart 
        height={600}
        data={data} 
        scale={scale} 
        padding={[30, 20, 95, 20]} 
        autoFit
      >
        <Axis name="y" visible={false} />
        <Tooltip />
        <Coordinate type={this.state.coordType} />
        <Geom type="line" position="x*y" size={2} color="#ff8800" />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<RadarFlowerLine />, mountNode)

```

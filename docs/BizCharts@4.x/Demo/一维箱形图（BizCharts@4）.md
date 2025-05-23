# 一维箱形图（BizCharts@4）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/8ad66370-a589-11ea-81ea-c1be346d20b9.png)

```js
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Schema } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [{
  low: 1,
  q1: 9,
  median: 16,
  q3: 22,
  high: 24,
}];

const dv = new DataView().source(data);
dv.transform({
  type: 'map',
  callback: function callback(obj) {
    obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
    return obj;
  },
});

const cols = {
  range: { max: 35, nice: true },
};


class Box extends React.Component {
  render() {
    return (
      <Chart height={400} data={dv} scale={cols} autoFit>
        <Tooltip crosshairs={false} />
        <Axis />
        <Schema
          position="range*1"
          shape="box"
          tooltip="x*low*q1*median*q3*high"
          style={{
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
          }}
          animate={
          {animation: 'scale-in-x'}
          }
          />
      </Chart>
    );
  }
}

// CDN END
ReactDOM.render(<Box />, mountNode)

```

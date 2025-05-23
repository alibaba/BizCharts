# legend-position

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77bb5640-9979-11ea-8225-e30c1937e15c.png)

```js
import $ from "jquery";
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts@3.5.8';
import DataSet from '@antv/data-set';
let data;
$.ajax({
  url: "https://alifd.alibabausercontent.com/materials/@bizcharts/other-legend-position/0.1.2/mock.json",
  async : false,
  success: (iData) => { data = iData }
});

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'map',
  callback: function callback(row) {
    row.range = [row.younger, row.older];
    return row;
  },
});
dv.transform({
  type: 'fold',
  fields: ['younger', 'older'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});

const scale = {
  year: {
    type: 'linear',
    tickInterval: 10,
  },
  range: {
    type: 'linear',
    min: 10,
    max: 45,
    tickInterval: 5,
  },
  value: {
    type: 'linear',
    min: 10,
    max: 45,
    tickInterval: 5,
  },
};

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 'top-center',
    };
  }

  render() {
    return (
      <div>
        <select
          value={this.state.val}
          onChange={(val) => {
            console.log(val.target.value);
            this.setState({
              val: val.target.value,
            });
          }}
        >
          <option value="top-left">top-left</option>
          <option value="top-center">top-center</option>
          <option value="top-right">top-right</option>
          <option value="bottom-left">bottom-left</option>
          <option value="bottom-center">bottom-center</option>
          <option value="bottom-right">bottom-right</option>
          <option value="left-top">left-top</option>
          <option value="left-center">left-center</option>
          <option value="left-bottom">left-bottom</option>
          <option value="right-top">right-top</option>
          <option value="right-center">right-center</option>
          <option value="right-bottom">right-bottom</option>
        </select>
        <Chart height={400} data={dv} scale={scale} padding="auto" forceFit>
          <Axis />
          <Legend position={this.state.val} />
          <Axis name="value" visible={false} />
          <Tooltip />
          <Geom
            type="area"
            position="year*range"
            color={'045493'}
            opacity={0.05}
            tooltip={false}
          />
          <Geom
            type="line"
            position="year*value"
            color={['type', ['#d97841', '#4495c2']]}
            size={3}
            style={{
              opacity: 0.7,
            }}
          />
        </Chart>
      </div>
    );
  }
}

// CDN END
ReactDOM.render(<Demo />, mountNode)

```

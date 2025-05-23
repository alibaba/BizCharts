# 堆叠条形图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/90e9af50-3838-11eb-a65b-e3cbe799403e.png)

```js
import React from "react";
import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts@4.x";
import DataSet from "@antv/data-set";

class Stacked extends React.Component {
  render() {
    const data = [
      {
        State: "WY",
        "小于5岁": 25635,
        "5至13岁": 1890,
        "14至17岁": 9314
      },
      {
        State: "DC",
        "小于5岁": 30352,
        "5至13岁": 20439,
        "14至17岁": 10225
      },
      {
        State: "VT",
        小于5岁: 38253,
        "5至13岁": 42538,
        "14至17岁": 15757
      },
      {
        State: "ND",
        "小于5岁": 51896,
        "5至13岁": 67358,
        "14至17岁": 18794
      },
      {
        State: "AK",
        "小于5岁": 72083,
        "5至13岁": 85640,
        "14至17岁": 22153
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["小于5岁", "5至13岁", "14至17岁"],
      // 展开字段集
      key: "年龄段",
      // key字段
      value: "人口数量",
      // value字段
      retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <Chart height={400} data={dv.rows} autoFit>
        <Coordinate transposed/>
				<Tooltip shared />
        <Axis
          name="State"
          label={{
            offset: 12
          }}
        />
        <Interval
          adjust={[{ type: 'stack' }]}
          position="State*人口数量"
          color={"年龄段"}
					style={{
						fillOpacity:0.75
					}}
          label={['人口数量', { position: 'middle', offset: 0, style: { fill: '#fff' }, layout: { type: 'limit-in-shape' } }]}
        />
      </Chart>
    );
  }
}

ReactDOM.render(<Stacked />, mountNode)

```

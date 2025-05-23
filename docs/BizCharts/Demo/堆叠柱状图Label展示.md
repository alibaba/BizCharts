# 堆叠柱状图Label展示

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77e32990-9979-11ea-9761-adf4e02ffa04.png)

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
import DataSet from "@antv/data-set";

class Stacked extends React.Component {
  render() {
    const data = [
      {
        State: "WY",
        小于5岁: 25635,
        "5至13岁": 1890,
        "14至17岁": 9314
      },
      {
        State: "DC",
        小于5岁: 30352,
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
        小于5岁: 51896,
        "5至13岁": 67358,
        "14至17岁": 18794
      },
      {
        State: "AK",
        小于5岁: 72083,
        "5至13岁": 85640,
        "14至17岁": 22153
      }
    ];
    data.map(d=>{
        const total = ["小于5岁", "5至13岁", "14至17岁"].reduce((pre,f)=>{
        pre+=d[f];
        return pre;
        },0);
        d.Total = total;
    })
   
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
      retains: ["State",'Total'] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord  />
          <Axis
            name="State"
            label={{
              offset: 12
            }}
          />
          <Axis name="人口数量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="State*人口数量"
            color={"年龄段"}
          >
            <Label content={['Total*年龄段',(t,n)=>{
                if(n==='小于5岁'){
                    return t;
                }
            }]}/>
          </Geom>
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Stacked />, mountNode)

```

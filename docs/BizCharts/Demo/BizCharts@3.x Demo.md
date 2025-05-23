# BizCharts@3.x Demo

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/7805f3d0-9979-11ea-8225-e30c1937e15c.png)

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
} from "bizcharts@3.5.8"; // 请注意此处引用3.X版本号， try 4.X https://bizcharts.alibaba-inc.com/product/BizCharts@4.x/demo/309

class Basic extends React.Component {
  render() {
    const data = [
      {
        year: "1991",
        value: 3
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      },
      {
        year: "1995",
        value: 4.9
      },
      {
        year: "1996",
        value: 6
      },
      {
        year: "1997",
        value: 7
      },
      {
        year: "1998",
        value: 9
      },
      {
        year: "1999",
        value: 13
      }
    ];
    const cols = {
      value: {
        min: 0,
        alias:'次数'
      },
      year: {
        range: [0.05, 0.95],
        alias:'时间'
      }
    };

    return (
      <div>
        <h1 style={{textAlign:"center"}}>折线图Demo</h1>
        <Chart height={300} data={data} scale={cols} forceFit>
          <Axis name="year" title/>
          <Axis name="value"  title/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="year*value" size={2} 
            tooltip={['year*value',(year,value)=>{
              return {
                  name:'数值', // 要显示的名字
                  value:value,
                  title:year
              }
          }]} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
            tooltip={['year*value',(year,value)=>{
              return {
                  name:'数值', // 要显示的名字
                  value:value,
                  title:year
              }
          }]}
          />
        </Chart>
        <h1 style={{textAlign:"center"}}>柱状图Demo</h1>
        <Chart height={300} data={data} scale={cols} forceFit>
          <Axis name="year"  title/>
          <Axis name="value" title/>
          <Tooltip
            // crosshairs用于设置 tooltip 的辅助线或者辅助框
            // crosshairs={{
            //  type: "y"
            // }}
          />
          <Geom type="interval" position="year*value" />
        </Chart>
        <h1 style={{textAlign:"center"}}>饼图Demo</h1>
        <Chart
            height={300}
            data={data}
            forceFit
          >
            <Coord type="theta"/>
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="value"
              color="year"
            >
              <Label content="value" />
			</Geom>
            <Legend/>
          </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Basic />, mountNode)

```

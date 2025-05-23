# 使用html语法显示图表标题

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/77f66370-9979-11ea-bd36-0f0eda3e7ac1.png)

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

const styles ={
  mainTitle:{
    fontSize:20,
    color:"black",
    textAlign:"center"
  },
  subTitle:{
    fontSize:16,
    color:"gray",
    textAlign:"center"
  }
}

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
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
           <h3 className='main-title' style={styles.mainTitle}>
            阿里销售业绩
          </h3>
          <h4 className='sub-title' style={styles.subTitle}>
            2018年每月新零售门店销量
          </h4>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

ReactDOM.render(<Basic />, mountNode)

```

# 对比漏斗图(bizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/62473e10-5f84-11eb-b8a3-4f1eeb0fc6f2.png)

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
  Interaction,
} from "bizcharts";

class Comparision extends React.Component {
  render() {
    const expectData = [
      {
        value: 100,
        name: "展现"
      },
      {
        value: 80,
        name: "点击"
      },
      {
        value: 60,
        name: "访问"
      },
      {
        value: 40,
        name: "咨询"
      },
      {
        value: 30,
        name: "订单"
      }
    ];
    const actualData = [
      {
        value: 80,
        name: "展现"
      },
      {
        value: 50,
        name: "点击"
      },
      {
        value: 30,
        name: "访问"
      },
      {
        value: 10,
        name: "咨询"
      },
      {
        value: 5,
        name: "订单"
      }
    ];
    return (
        <Chart
          data={[1]}
          height={600}
          
          autoFit
          padding={[20,50,30]}
          
        >
          <Axis visible={false} />
          <Tooltip
            showTitle={false}
            showMarkers={false}
            shared={true}
            itemTpl='<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Coordinate type="rect" transpose scale={[1, -1]} />
          <View data={expectData}>
            <Interval
              adjust="symmetric"
              position="name*value"
              shape="pyramid"
              color={[
                "name",
                ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
              ]}
              tooltip={[
                "name*value",
                (name, value) => {
                  return {
                    name: "预期" + name,
                    value
                  };
                }
              ]}
              opacity={0.65}
              label={['name',{
                offset: 35,
                labelLine: {
                  style: {
                    lineWidth: 1,
                    stroke: 'rgba(0, 0, 0, 0.15)',
                  },
    }
              }]}
            />
            
          </View>
          <View data={actualData}>
            <Interval
              adjust="symmetric"
              position="name*value"
              shape="pyramid"
              color={[
                "name",
                ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
              ]}
              tooltip={[
                "name*value",
                (name, value) => {
                  return {
                    name: "实际" + name,
                    value
                  };
                }
              ]}
              opacity={1}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            />
          </View>
          <Interaction type="element-active" />
        </Chart>
      
    );
  }
}

ReactDOM.render(<Comparision />, mountNode)

```

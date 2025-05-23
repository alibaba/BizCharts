# 实时更新折线图(BizCharts@4.x)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/72e82710-ae7f-11ed-bfcb-853eef9a9748.png)

```js
import React, { useState, useEffect } from "react";
import { Chart, Geom } from "bizcharts";

const initData = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 13
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 16.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 10
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 7.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 9.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 9.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 8.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 8.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 5.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 5.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 9.8
  }
];


const Demo = () => {
  const [data, setData] = useState(initData);

  useEffect(() => {
    let interval = bxInterval(() => {
      setData(pre=>([
        ...pre,
        {
          month: Math.random().toString(36).substring(7),
          city: "Tokyo",
          temperature: Math.random() * 15
        },
        {
          month: Math.random().toString(36).substring(7),
          city: "London",
          temperature: Math.random() * 15
        }
      ]));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Chart autoFit height={500} data={data}>
      <Geom
        type="line"
        position="month*temperature"
        color={["city", ["#ff7f0e", "#2ca02c"]]}
        animate={{
          appear: {
            animation: "pahtIn"
          },
          enter: {
            animation: "fadeIn"
          }
        }}
      />
    </Chart>
  );
};

ReactDOM.render(<Demo />, mountNode);


```

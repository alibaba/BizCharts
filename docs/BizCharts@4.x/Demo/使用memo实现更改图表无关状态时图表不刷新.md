# 使用memo实现更改图表无关状态时图表不刷新

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/07ce2c60-6929-11eb-9b2e-1bd85a98cb49.png)

```js
import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Chart, LineAdvance, Annotation } from "bizcharts";

// 数据源
const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7,
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9,
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 13,
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2,
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 16.5,
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7,
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5,
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5,
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 10,
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9,
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 7.5,
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2,
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 9.2,
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17,
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 14.5,
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6,
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 9.3,
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2,
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 8.3,
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3,
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 8.9,
  },
  {
    month: "Nov",
    city: "London",
    temperature: 5.6,
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 5.6,
  },
  {
    month: "Dec",
    city: "London",
    temperature: 9.8,
  },
];

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const LineChart = React.memo(({ data }) => {
  return (
    <Chart padding={[10, 20, 60, 40]} autoFit height={300} data={data}>
      <LineAdvance
        shape="smooth"
        point
        area
        position="month*temperature"
        color="city"
      />
      <Annotation.Line
        start={["min", 7]}
        end={["max", 7]}
        style={{
          lineDash: [4, 4],
          stroke: "red",
        }}
      />
    </Chart>
  );
});

function Demo() {
  const [date, setDate] = useState(moment(new Date()).format("HH:mm:ss"));
  useInterval(() => {
    setDate(moment(new Date()).format("HH:mm:ss"));
  }, 1000);
  return (
    <div>
      <p>当前时间：<b>{date}</b></p>
      <LineChart data={data} />
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode);

```

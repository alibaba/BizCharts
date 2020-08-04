import React from "react";
import {
  Chart,
  LineAdvance,
  // Line,
  Tooltip,
} from "../../src";

// 数据源
const data = [
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
    temperature: 6.9
  },
  {
    month: "Feb",
    city: "London",
    temperature: 8.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 12.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 12.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 15.4
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8
  }
];
function Basic() {
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
      <Chart height={400} padding="auto" data={data} scale={cols} autoFit>
        <LineAdvance
          position="month*temperature"
          point
          label="temperature"
          color="city"
        />
      </Chart>
      <Chart height={400} padding="auto" data={data} scale={cols} autoFit>
        <Tooltip showCrosshairs={false} />
        <LineAdvance
          position="month*temperature"
          color="city"
          label="temperature"
          area
          shape="smooth"
        />
      </Chart>
    </div>
  );
}

export default Basic;

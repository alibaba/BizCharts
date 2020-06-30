import React, { useEffect, useState } from "react";
import {
  Chart,
  Interval,
  Coordinate
} from "../../src";

const data1 = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5},
  { year: "1994", value: 5},
  { year: "1995", value: 4.9},
  { year: "1996", value: 6},
  { year: "1997", value: 7},
  { year: "1998", value: 9},
  { year: "1999", value: 13}
];

const data2 = [
  { year: "1991", value: 13 },
  { year: "1992", value: 44 },
  { year: "1993", value: 13.5},
  { year: "1994", value: 55},
  { year: "1995", value: 42.9},
  { year: "1996", value: 36},
  { year: "1997", value: 27},
  { year: "1998", value: 39},
  { year: "1999", value: 13}
];

const data3 = [
  { year: "1991", value: 33 },
  { year: "1992", value: 24 },
  { year: "1993", value: 31.5},
  { year: "1994", value: 52},
  { year: "1995", value: 242.9},
  { year: "1996", value: 6},
  { year: "1997", value: 57},
  { year: "1998", value: 29},
  { year: "1999", value: 13}
];

const Basic = () => {
  const [ data, setData ] = useState(undefined)
  useEffect(() => {
    setInterval(() => {
      const count = Math.random();
      if (count > 0.8) {
        setData(data1);
        return;
      }
      if (count > 0.5) {
        setData(data2);
        return;
      }
      if (count > 0.2) {
        setData(data3);
        
      }
    }, 2000)
  }, [])
  return (
    <Chart filter={[['value', v => v > 6]]} data={data} height={500} autoFit>
      <Interval position="year*value" />
      <Coordinate transpose />
    </Chart>
  );
}

export default Basic;

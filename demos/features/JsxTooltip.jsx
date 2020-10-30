import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  Interval,
  Tooltip,
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
  const [ data, setData ] = useState(data1);
  const div = useRef(null);

  const count = Math.random();
  console.log(count)

  useEffect(() => {
    // setInterval(() => {
    //   const count = Math.random();
    //   if (count > 0.8) {
    //     setData(data1);
    //     return;
    //   }
    //   if (count > 0.5) {
    //     setData(data1);
    //     return;
    //   }
    //   if (count > 0.2) {
    //     setData(data1);
    //   }
    // }, 2000)
  }, [])
  return (
    <div style={{ width: 800 }} >
      <div onClick={() => {
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
      }}>click me！</div>
    <div style={{ transform: 'scale(0.5)translate(10px,30px)' }}>
      <h5>scale下的tooltip</h5>
      <Chart data={data}  width={300} height={300} onGetG2Instancce={(chart) => {
        chart.on('tooltip:show', () => console.log('show'))
      }} >
        <Interval position="year*value" />
        <Tooltip onShow={() => console.log('show')} />
      </Chart>
      <Chart data={data} width={300} height={300} onGetG2Instancce={(chart) => {
        // chart.on('tooltip:change', console.log)
      }} >
        <Interval position="year*value" />
        <Coordinate transpose />
      </Chart>
      
    </div>
    <Chart data={data} width={300} height={300} onGetG2Instancce={(chart) => {
      // chart.on('tooltip:change', console.log)
    }} >
      <Interval position="year*value" />
      <Coordinate transpose />
      {count > 0.5 ? <Tooltip>
        {
          (title) => {
            return title;
          }
        }
      </Tooltip> : <Tooltip />}
    </Chart>
    <Chart data={data} width={500} height={300} autoFit={!(Math.random()>0.5)} >
      <Interval position="year*value" />
      <Coordinate transpose />
      <Tooltip>
        {
          (title) => {
            return <div>{title}</div>;
          }
        }
      </Tooltip>
    </Chart>
    </div>
  );
}

export default Basic;

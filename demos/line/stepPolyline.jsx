import React from 'react';
import { Chart, Line, Point } from "../../src";

// 数据源
const data = [
      {
        month: "Jan",
        value: 51
      },
      {
        month: "Feb",
        value: 91
      },
      {
        month: "Mar",
        value: 34
      },
      {
        month: "Apr",
        value: 47
      },
      {
        month: "May",
        value: 63
      },
      {
        month: "June",
        value: 58
      },
      {
        month: "July",
        value: 56
      },
      {
        month: "Aug",
        value: 77
      },
      {
        month: "Sep",
        value: 99
      },
      {
        month: "Oct",
        value: 106
      },
      {
        month: "Nov",
        value: 88
      },
      {
        month: "Dec",
        value: 56
      }
    ];

function Demo() {
  return <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={500} data={data} >
    <Line shape="hv" position="month*value" />
  </Chart>
}



export default Demo;

 

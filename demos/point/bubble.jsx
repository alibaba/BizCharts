import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
} from '../../src';


 function Demo() {
   const [data, setData] = useState(undefined);
   useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-bubble/0.2.9/mock.json')
       .then(res => res.json())
       .then(data => {

         setData(data);
       })
   }, [])
   
   const scale = {
      LifeExpectancy: {
        alias: '人均寿命（年）',
        nice: true,
      },
      Population: {
        type: 'pow',
        alias: '人口总数'
      },
      GDP: {
        alias: '人均国内生产总值($)',
        nice: true,
      },
      Country: {
        alias: '国家/地区'
      }
    };
    
  const colorMap = {
    Asia: '#1890FF',
    Americas: '#2FC25B',
    Europe: '#FACC14',
    Oceania: '#223273',
  };
   
   return <Chart
     height={400}
     data={data}
     autoFit
     scale={scale}
     interactions={['element-active']}
   >
    <Point
      position="GDP*LifeExpectancy"
      color={["continent", val => {
        return colorMap[val];
      }]}
      opacity={0.65}
      shape="circle"
      size={["Population", [4, 65]]}
      style={['continent',  (val) => {
        return {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.3,
          opacity: 0.65,
          stroke: colorMap[val],
        };
      }]}
    />
   </Chart>
 }
 
 export default Demo;
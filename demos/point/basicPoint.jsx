import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
} from '../../src';


 function Demo() {
   const [data, setData] = useState([]);
   useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
       .then(res => res.json())
       .then(data => {
         console.log(data)
         setData(data);
       })
   }, [])
   
   return <Chart
     height={400}
     data={data}
     placeholder
     autoFit
     interactions={['legend-highlight']}
   >
    <Point
      position="height*weight"
      color="gender"
      shape="circle"
      fill={{
        fillOpacity: 0.85
      }} />
   </Chart>
 }
 
 export default Demo;

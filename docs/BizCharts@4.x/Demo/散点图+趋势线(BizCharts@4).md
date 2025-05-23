# 散点图+趋势线(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/97f76400-cf62-11ec-8e3d-0b899e1b293d.png)

```js
import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
	Annotation,
} from 'bizcharts';
import 'd3-regression';
import numeral from 'numeral';

const linearRegression = d3.regressionLinear()
  .x(d => d.height)
  .y(d => d.weight);

 function Demo() {
   const [data, setData] = useState([]);
   useEffect(() => {
     fetch('//alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
       .then(res => res.json())
       .then(data => {
         console.log(data)
				 const min = Math.min(...data.map(d => d.height));
				 const max = Math.max(...data.map(d => d.height));
				 // linearRegression.domain([min, max]);
         setData(data);
       })
   }, [])
   const l = linearRegression(data || []);
	 console.log(l)
	 const b = numeral(l.b).format('0.00');
   return <Chart
     height={400}
     data={data}
     autoFit
     interactions={['legend-highlight']}
   >
    <Point
      position="height*weight"
      color="gender"
      shape="circle"
      style={{
        fillOpacity: 0.85
      }} />
    <Annotation.Line style={{ stroke: 'red' }} start={l[0]} end={l[1]} />
   </Chart>
 }
 
 ReactDOM.render(<Demo />, mountNode);
```

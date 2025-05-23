# 多形状散点图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/8195eab0-afa2-11ea-8765-9d54391a91b0.png)

```js
import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
} from 'bizcharts';


 function Demo() {
   const [data, setData] = useState();
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
     autoFit
     interactions={['legend-highlight']}
   >
    <Point
      position="height*weight"
      color="gender"
      shape={['gender', ['circle', 'square']]}
      style={{
        fillOpacity: 0.85
      }} />
   </Chart>
 }
 
 ReactDOM.render(<Demo />, mountNode);
```

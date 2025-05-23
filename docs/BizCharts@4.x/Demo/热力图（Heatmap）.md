# 热力图（Heatmap）

![预览](https://z.alicdn.com/alickn/chu-ko-no/2020-4-29/bizcharts/392a9f8e-5cf1-4935-b39b-40fc9b6d1ff6/392a9f8e-5cf1-4935-b39b-40fc9b6d1ff6.png)

```js
import React, { useState, useEffect } from 'react';
import {
  Chart,
  View,
  Tooltip,
  Schema,
  Axis,
  Legend,
  Annotation,
  Heatmap
} from 'bizcharts';
import DataSet from '@antv/data-set';


 function Demo() {
   const [data, setData] = useState([]);
   useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json')
       .then(res => res.json())
       .then(data => {
           setData(data);
       })
   }, [])
   
   return data.length ? <Chart
     height={400}
     padding={[10, 40, 40, 40]}
     data={data}
     autoFit
     scale={{
        tmp: { nice: true }
     }}
   >
     <Tooltip
        showTitle={false}
     />
     <Axis visible={false} />
     <Legend offset={10} />
     <Heatmap position={'g*l'} color={['tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
     <Annotation.Image
      start={['min', 'max']}
      end={['max', 'min']}
      src={'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png'}
     />
  </Chart> : null
 }
 
 ReactDOM.render(<Demo />, mountNode);
```

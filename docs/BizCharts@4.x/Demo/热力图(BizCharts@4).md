# 热力图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/acb80f30-afb0-11ea-837f-55d728e4ee90.png)

```js
import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  View,
  Tooltip,
  Schema,
  Axis,
  Legend,
  Interval,
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
     <Legend offsetX={10} />
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

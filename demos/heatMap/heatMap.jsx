import React, { useState, useEffect } from 'react';
import {
  Chart,
  Tooltip,
  Axis,
  Legend,
  Annotation,
  Heatmap
} from '../../src';


 function Demo() {
   const [data, setData] = useState([]);
   useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json')
       .then(res => res.json())
       .then(resData => {
          setData(resData);
       })
   }, [])
   
   return <Chart
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
     <Heatmap position="g*l" color={['tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2']} />
     <Annotation.Image
      start={['min', 'max']}
      end={['max', 'min']}
      src="https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png"
     />
  </Chart>
 }
 
 export default Demo;
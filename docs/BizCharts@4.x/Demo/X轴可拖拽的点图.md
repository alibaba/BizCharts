# X轴可拖拽的点图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0079c9b0-f38a-11eb-87eb-ffd7ec19ab6e.png)

```js
import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
	registerInteraction
} from 'bizcharts';

let chartIns;
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
	registerInteraction('drag-move', {
 	 	start: [{ trigger: 'plot:mousedown', action: 'scale-translate:start' }],
  	processing: [{ trigger: 'plot:mousemove', action: 'scale-translate:translate', throttle: {wait: 100, leading: true, trailing: false} }],
  	end: [{ trigger: 'plot:mouseup', action: 'scale-translate:end' }],
	});
	return <>

		<Chart
		
			height={400}
			data={data}
			autoFit
			interactions={['drag-move']}
			onGetG2Instance={(c => {
				chartIns = c;
				c.on('beforepaint', () => {
					// 获取框选出来的数据
					console.log(c.filteredData)
				})
			})}
		>
			<Point
				position="height*weight"
				color="gender"
				shape="circle"
				style={{
					fillOpacity: 0.85
				}} />
		</Chart>
		<button onClick={e => {
			chartIns.emit('reset-button:click', e)
		}}>点我重置框选</button>
	</>
}

ReactDOM.render(<Demo />, mountNode);
```

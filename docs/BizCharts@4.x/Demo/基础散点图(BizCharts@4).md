# 基础散点图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/ce1e85e0-54b6-11eb-8f83-8fe238d8e233.png)

```js
import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
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

	return <>

		<Chart
			height={400}
			data={data}
			autoFit
			interactions={['legend-highlight', 'brush']}
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

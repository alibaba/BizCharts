# 气泡图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/63a34af0-f854-11ec-93dd-bf93da1a9155.png)

```js
import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
	Legend,
	Axis
} from 'bizcharts';


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
			// type: 'pow',
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
		<Legend name="Population" visible={false} />
		<Point
			position="GDP*LifeExpectancy"
			color={["continent", val => {
				return colorMap[val];
			}]}
			shape="circle"
			size={["Population", [4, 65]]}
			style={['continent', (val) => {
				return {
					lineWidth: 1,
					strokeOpacity: 1,
					fillOpacity: 0.3,
					stroke: colorMap[val],
				};
			}]}
		/>
		<Axis name='GDP' grid={{
			line: {
				style: {
					stroke: '#e3e3e3'
				}
			}
		}} />
		<Axis name='LifeExpectancy' grid={{
			line: {
				style: {
					stroke: '#e3e3e3'
				}
			}
		}} />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

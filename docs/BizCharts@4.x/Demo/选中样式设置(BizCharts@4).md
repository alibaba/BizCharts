# 选中样式设置(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/0e569f00-2fc6-11eb-8de7-130d2b1b6818.png)

```js
import React from 'react';
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	Interaction,
	getTheme
} from 'bizcharts@4.x';

function Labelline() {
	const data = [
		{ item: '事例一', count: 40, percent: 0.4 },
		{ item: '事例二', count: 21, percent: 0.21 },
		{ item: '事例三', count: 17, percent: 0.17 },
		{ item: '事例四', count: 13, percent: 0.13 },
		{ item: '事例五', count: 9, percent: 0.09 },
	];

	const cols = {
		percent: {
			formatter: val => {
				val = val * 100 + '%';
				return val;
			},
		},
	};


	return (
		<Chart height={400} data={data} scale={cols} autoFit>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
				color="item"
				style={{
					lineWidth: 1,
					stroke: '#fff',
				}}
				label={['count', {
					content: (data) => {
						return `${data.item}: ${data.percent * 100}%`;
					},
				}]}
				state={{
					selected: {
						style: (t) => {
							const res = getTheme().geometries.interval.rect.selected.style(t);
							return { ...res, fill: 'red' }
						}
					}
				}}
			/>
			<Interaction type='element-single-selected' />
		</Chart>
	);
}

ReactDOM.render(<Labelline />, mountNode);

```

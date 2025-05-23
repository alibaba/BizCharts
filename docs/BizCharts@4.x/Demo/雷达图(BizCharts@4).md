# 雷达图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/9e32db70-14c5-11ee-adb7-c3b290dea37c.png)

```js
import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
	Line,
	Axis,
	Area,
	Tooltip,
	Coordinate
} from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
	{ item: 'Design', a: 70, b: 30 },
	{ item: 'Development', a: 60, b: 70 },
	{ item: 'Marketing', a: 50, b: 60 },
	{ item: 'Users', a: 40, b: 50 },
	{ item: 'Test', a: 60, b: 70 },
	{ item: 'Language', a: 70, b: 50 },
	{ item: 'Technology', a: 50, b: 40 },
	{ item: 'Support', a: 30, b: 40 },
	{ item: 'Sales', a: 60, b: 40 },
	{ item: 'UX', a: 50, b: 60 },
];

function Demo() {

	const { DataView } = DataSet;
	const dv = new DataView().source(data);
	dv.transform({
		type: 'fold',
		fields: ['a', 'b'], // 展开字段集
		key: 'user', // key字段
		value: 'score', // value字段
	});

	return <Chart
		height={400}
		data={dv.rows}
		autoFit
		scale={{
			score: {
				min: 0,
				max: 80,
			},
			user: {
				formatter: (val) => {
					return { a: '某A', b: '某B' }[val]
				}
			}
		}}
		onAxisLabelClick={console.log}
		interactions={['legend-highlight']}
	>
		<Coordinate type="polar" radius={0.8} />
		<Tooltip shared />
		<Point
			position="item*score"
			color="user"
			shape="circle"
		/>
		<Line
			position="item*score"
			color="user"
			size={2}
		/>
		<Area
			position="item*score"
			color="user"
		/>
		{
			// 棱角和圆形，默认圆形
		}
		<Axis name="score" grid={{ line: { type: 'line' } }} />
		{
			// 不需要轴的最外圈
		}
		<Axis
			name="item"
			line={false}
			verticalLimitLength={60}
			label={{
				autoHide: false,
				autoEllipsis: true
			}} />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

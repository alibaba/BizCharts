# 基础仪表盘(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/bdad2930-8d34-11eb-9a78-1b973196c7b5.png)

```js
import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
	Area,
	Annotation,
	Axis,
	Coordinate,
	registerShape,
	registerAnimation,
} from 'bizcharts';

// 自定义Shape 部分
registerShape('point', 'pointer', {
	draw(cfg, container) {

		const group = container.addGroup();
		console.log(cfg)
		const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
		const start = this.parsePoint({ x: 0, y: 0.5 }); // 获取极坐标系下起始点
		// 绘制指针
		const line = group.addShape('line', {
			attrs: {
				x1: center.x,
				y1: center.y,
				x2: cfg.x,
				y2: cfg.y,
				stroke: cfg.color,
				lineWidth: 5,
				lineCap: 'round',
			},
		});
		group.addShape('circle', {
			attrs: {
				x: center.x,
				y: center.y,
				r: 9.75,
				stroke: cfg.color,
				lineWidth: 4.5,
				fill: '#fff',
			},
		});

		const preAngle = this.preAngle || 0;

		const angle1 = Math.atan((start.y - center.y) / (start.x - center.x));
		const angle = (Math.PI - 2 * (angle1)) * cfg.points[0].x;

		
		if (group.cfg.animable) {
			group.animate((ratio) => {
				group.resetMatrix();
				group.rotateAtPoint(center.x, center.y, preAngle + (angle - preAngle) * ratio);
			}, 300);
		} else {
			group.rotateAtPoint(center.x, center.y, angle);
		}
		this.preAngle = angle;

		return group;
	},
});

registerAnimation('cust-animation', (shape) => {
	console.log('cust-animation', shape)
})

const scale = {
				value: {
					min: 0,
					max: 1,
					tickInterval: 0.1,
					formatter: v => v * 100
				}
			}


function Demo() {
	const [data, setData] = useState([{ value: 0.56 }]);
	useEffect(() => {
		setTimeout(() => {
			setData([{ value: 0.20 }])
		}, 1000)
	}, [])
	return (
		<Chart
			height={500}
			data={data}
			scale={scale}
			autoFit
		>
			<Coordinate
				type="polar"
				radius={0.75}
				startAngle={(-12 / 10) * Math.PI}
				endAngle={(2 / 10) * Math.PI}
			/>
			<Axis name="1" />
			<Axis
				name="value"
				line={null}
				label={{
					offset: -36,
					style: {
						fontSize: 18,
						textAlign: 'center',
						textBaseline: 'middle',
					},
				}}
				subTickLine={{
					count: 4,
					length: -15,
				}}
				tickLine={{
					length: -24,
				}}
				grid={null}
			/>
			<Point
				position="value*1"
				color="#1890FF"
				shape="pointer"
				
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[1, 1]}
				style={{
					stroke: '#CBCBCB',
					lineWidth: 18,
					lineDash: null,
				}}
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[data[0].value, 1]}
				style={{
					stroke: '#1890FF',
					lineWidth: 18,
					lineDash: null,
				}}
			/>
		</Chart>
	)
}

ReactDOM.render(<Demo />, mountNode);
```

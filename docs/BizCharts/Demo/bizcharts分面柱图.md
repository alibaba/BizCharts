# bizcharts分面柱图

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/bf27a8d0-0f80-11eb-87d3-2bfc43bb16f1.png)

```js
/**
 * 基础图表
 */

import React from 'react';
import {
	Chart,
	Geom,
	Axis,
	Coord,
	Tooltip,
	Legend,
	Facet,
	View,
} from 'bizcharts@3.5.8';

import DataSet from '@antv/data-set';

const data = [
	{ genre: 'Sports', sold: 275, code: 500 },
	{ genre: 'Strategy', sold: 115, code: 3892 },
	{ genre: 'Action', sold: 120, code: 3212 },
	{ genre: 'Shooter', sold: 350, code: 1239 },
	{ genre: 'Other', sold: 150, code: 3192 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
	type: 'fold',
	fields: ['sold', 'code'], // 展开字段集
	key: 'type', // key字段
	value: 'value', // value字段
});
const padding = 50;

function Demo() {
	return <Chart
		height={600}
		data={dv}
		padding={padding}
		forceFit
		onGetG2Instance={c => {
			const views = [...c.get('views')];
			const width = c.get('width');
			const height = c.get('height');
			for (let i = 0; i < views.length; i++) {
				const data = views[i].get('data');
				for(let j=0;j<data.length;j++){
					const xy = views[i].getXY(data[j]);
					if (xy) {
						const start = {
							x: (xy.x - padding) / (width - padding * 2),
							y: (xy.y - padding) / (height - padding * 2),
						};
						let dir = 1;
						if (xy.x > width / 2) {
							dir = 1;
						} else {
							dir = -1;
						}
						const view = c.view({
							start: { x: start.x + dir * 0.15, y: start.y + dir * 0.05 },
							end: {
								x: start.x,
								y: start.y - dir * 0.05,
							},
						});
						view.source(dv); // 默认使用 chart 的列定义
						view.coord('theta'); // 覆盖了 chart 的 coord 配置
						view
							.intervalStack()
							.position('value')
							.color('genre');
					}
				};
			}
			c.render();
		}}
	>
		<Tooltip />
		<Legend />
		<Facet
			type="mirror"
			fields={['type']}
			transpose
			// 通过 padding 来修改每个图表的间距
			padding={40}
			colTitle={{
				offsetY: -50, // 列标题垂直方向的偏移
				style: {
					marginTop: 20,
					fontSize: 14,
					textAlign: 'center',
					fill: '#444',
				}, // 标题文本样式
			}}
			rowTitle={{
				offsetX: -15,
				style: {
					fontSize: 14,
					textAlign: 'center',
					fill: '#444',
				},
			}}
			eachView={view => {
				view
					.axis({
						title: true,
					})
					.scale({
						value: {
							alias: '233',
						},
					})
					.interval()
					.position('genre*value')
					.color('type');
			}}
		/>
	</Chart>
}
ReactDOM.render(
	<Demo />,
	mountNode,
);

```

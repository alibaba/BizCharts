# color映射多字段,分组堆叠柱状图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/d87ffab0-a410-11eb-83ce-e72692133a50.png)

```js
import React from 'react';
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Guide,
	Shape,
	Facet,
	Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
const newdata = [
	{
		time: '2019-02',
		level_s_amount: 123,
		level_a_amount: 223,
		level_b_amount: 310,
		level_c_amount: 412,
		level_other_amount: 312,
		level_s_gaap: 123,
		level_a_gaap: 542,
		level_b_gaap: 123,
		level_c_gaap: 432,
		level_other_gaap: 531,
	},
	{
		time: '2019-03',
		level_s_amount: 993,
		level_a_amount: 133,
		level_b_amount: 343,
		level_c_amount: 123,
		level_other_amount: 632,
		level_s_gaap: 342,
		level_a_gaap: 322,
		level_b_gaap: 564,
		level_c_gaap: 422,
		level_other_gaap: 965,
	},
	{
		time: '2019-04',
		level_s_amount: 312,
		level_a_amount: 533,
		level_b_amount: 111,
		level_c_amount: 222,
		level_other_amount: 333,
		level_s_gaap: 444,
		level_a_gaap: 523,
		level_b_gaap: 383,
		level_c_gaap: 343,
		level_other_gaap: 431,
	},
	{
		time: '2019-05',
		level_s_amount: 300,
		level_a_amount: 300,
		level_b_amount: 300,
		level_c_amount: 300,
		level_other_amount: 300,
		level_s_gaap: 300,
		level_a_gaap: 300,
		level_b_gaap: 300,
		level_c_gaap: 300,
		level_other_gaap: 300,
	},
	{
		time: '2019-06',
		level_s_amount: 300,
		level_a_amount: 300,
		level_b_amount: 300,
		level_c_amount: 300,
		level_other_amount: 300,
		level_s_gaap: 300,
		level_a_gaap: 300,
		level_b_gaap: 300,
		level_c_gaap: 300,
		level_other_gaap: 300,
	},
	{
		time: '2019-07',
		level_s_amount: 300,
		level_a_amount: 300,
		level_b_amount: 300,
		level_c_amount: 300,
		level_other_amount: 300,
		level_s_gaap: 300,
		level_a_gaap: 300,
		level_b_gaap: 300,
		level_c_gaap: 300,
		level_other_gaap: 300,
	},
];
const ds = new DataSet();
const dv = ds.createView().source(newdata);
dv.transform({
	type: 'fold',
	fields: [
		'level_s_amount',
		'level_a_amount',
		'level_b_amount',
		'level_c_amount',
		'level_s_gaap', 'level_a_gaap', 'level_b_gaap', 'level_c_gaap'
	],
	//   fields: ['time'],
	// 展开字段集
	key: 'key',
	// key字段
	value: 'value', // value字段
})
	.transform({
		type: 'map',
		callback: (obj) => {
			if (obj.key.indexOf('amount') !== -1) {
				obj.type = '合同金额'
			} else if (obj.key.indexOf('gaap') !== -1) {
				obj.type = 'GAAP收入'
			}
			obj.level = obj.key.split('_')[1].toUpperCase() + '级'
			// console.log(obj)
			return obj;
		},
	});
class Stackedcolumn extends React.Component {
	render() {

		return (
			<Chart height={400} onClick={e => {
				debugger
			}} data={dv.rows} autoFit>
				<Tooltip>
					{
						(time, items, ...args) => {
							if (items?.length) {
								const { data: { type } } = items[0];
								const legendItems = args[2].view.getController('legend').components[0].component.getItems()
								const legendMap = legendItems.reduce((pre, cur) => {
									const { value, marker } = cur;
									pre[value] = marker
									return pre
								}, {})
								const tooltipItems = dv.rows.filter(item => {
									return item.time === time && item.type === type
								})
								// 这里可以写react组件
								return <div>
									<h5 style={{marginBottom:-8}}><b>{time}</b></h5>
									<ul>
										{
											tooltipItems.map(t => {
												return <li style={{ margin: 8 }}>
													<span className='g2-tooltip-marker' style={{ backgroundColor: legendMap[t.level].style.fill }} />
													{t.type} {t.value}
												</li>
											})
										}
									</ul>
								</div>
							}
						}
					}</Tooltip>
				<Geom
					type="interval"
					position="time*value"
					color="level"
					style={{
						stroke: '#fff',
						lineWidth: 1,
					}}
					adjust={[
						{
							type: 'dodge',
							dodgeBy: 'type', // 按照 type 字段进行分组
							marginRatio: 0, // 分组中各个柱子之间不留空隙
						},
						{
							type: 'stack',
						},
					]}
				>
				</Geom>
			</Chart>
		);
	}
}

ReactDOM.render(<Stackedcolumn />, mountNode);

```

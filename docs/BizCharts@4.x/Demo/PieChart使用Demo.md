# PieChart使用Demo

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/9dafb180-0709-11ec-87eb-ffd7ec19ab6e.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { PieChart } from 'bizcharts';

// 数据源
const data = [
	{
		type: '分类一',
		value: 27,
	},
	{
		type: '分类二',
		value: 25,
	},
	{
		type: '分类三',
		value: 18,
	},
	{
		type: '分类四',
		value: 15,
	},
	{
		type: '分类五',
		value: 10,
	},
	{
		type: '其它',
		value: 5,
	},
];

function Demo() {
	return (
		<PieChart
			data={data}
			title={{
				visible: true,
				text: '饼图-外部图形标签(outer label)',
			}}
			description={{
				visible: true,
				text: '当把饼图label的类型设置为outer时，标签在切片外部拉线显示。设置offset控制标签的偏移值。',
			}}
			radius={0.5}
			angleField='value'
			colorField='type'
			label={{
				visible: true,
				type: 'spider',
				labelHeight: 28,
				content: v => `${v.type}\n${v.value}`
			}}
		/>
	);
}

ReactDOM.render(<Demo />, mountNode);
```

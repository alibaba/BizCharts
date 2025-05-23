# 自定义柱状图hover背景色

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/bbf58770-ee1f-11ec-ac99-4d7af411ab38.png)

```js
import { Chart, Interval, Tooltip } from 'bizcharts';

const data = [
	{ year: '1951 年', sales: 0 },
	{ year: '1952 年', sales: 52 },
	{ year: '1956 年', sales: 61 },
	{ year: '1957 年', sales: 45 },
	{ year: '1958 年', sales: 48 },
	{ year: '1959 年', sales: 38 },
	{ year: '1960 年', sales: 38 },
	{ year: '1962 年', sales: 38 },
];


function Demo() {
	return <Chart height={300} autoFit data={data} onGetG2Instance={chart => {
		chart.interaction('active-region', {
			start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { style: { fill: 'pink' } } }],
		});
	}} >
		<Interval position="year*sales" />
		<Tooltip shared />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

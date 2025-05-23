# 基础柱状图（Interval）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/b0b31880-5690-11ed-bfcb-853eef9a9748.png)

```js
import { Chart, Interval, Tooltip, getTheme } from 'bizcharts';

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
	return <Chart height={300} autoFit data={data} >
		<Interval position="year*sales" style={{ lineWidth: 4, stroke: getTheme().colors10[0] }} />
		<Tooltip shared />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

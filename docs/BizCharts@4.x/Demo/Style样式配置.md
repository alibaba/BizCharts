# Style样式配置

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/c80d0020-1387-11eb-a381-f150021acaf9.png)

```js
import { Chart, Interval } from 'bizcharts';

const data = [
	{ year: '1951 年', sales: 38 },
	{ year: '1952 年', sales: 52 },
	{ year: '1956 年', sales: 61 },
	{ year: '1957 年', sales: 45 },
	{ year: '1958 年', sales: 48 },
	{ year: '1959 年', sales: 38 },
	{ year: '1960 年', sales: 38 },
	{ year: '1962 年', sales: 38 },
];


function Demo() {
	return <Chart height={300} autoFit data={data} appendPadding={[20, 0]}>
		<Interval
			position="year*sales"
			size={20}
			label={[
				'sales',
				(val) => {
					return {
						content: val,
						style: {
							fill: 'red',
							fontSize: 18,
							fontWeight: 'bold',
						},
					};
				},
			]}
		/>
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

# 禁止lable自动隐藏和旋转

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/59e82530-0ad5-11eb-be8d-5d0fe3d00eda.png)

```js
import { Chart, Interval, Axis } from 'bizcharts';

const data = [
	{ year: '1951 年sdasadsa', sales: 38 },
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
		<Axis name='year' label={{ autoHide: false, autoRotate: false }} />
		<Interval position="year*sales" />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

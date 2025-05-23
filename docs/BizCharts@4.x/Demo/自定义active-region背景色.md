# 自定义active-region背景色

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/dd3c82d0-ee1f-11ec-9d77-d97c57b5a660.png)

```js
import { Chart, Interval, Tooltip, Interaction, registerInteraction } from 'bizcharts';


// 自定义背景框交互背景色
registerInteraction('active-region1', {
	start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { style: { fill: 'rgba(0,0,0,0.1)' } } }],
	end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

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
		<Interval position="year*sales" />
		<Tooltip shared />
		<Interaction type='active-region1' />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);
```

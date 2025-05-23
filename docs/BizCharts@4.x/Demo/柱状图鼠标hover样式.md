# 柱状图鼠标hover样式

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/b14984f0-fbb1-11ea-a381-f150021acaf9.png)

```js
import { Chart, Interval, Tooltip, registerInteraction } from "bizcharts";

registerInteraction("element-cursor-pointer", {
	start: [
		{
			trigger: "interval:mouseenter",
			action: (ctx) => {
				ctx.view.canvas.setCursor("pointer");
			},
		},
	],
	end: [
		{
			trigger: "interval:mouseleave",
			action: (ctx) => {
				ctx.view.canvas.setCursor("default");
			},
		},
	],
});

const data = [
	{ year: "1951 年", sales: 38 },
	{ year: "1952 年", sales: 52 },
	{ year: "1956 年", sales: 61 },
	{ year: "1957 年", sales: 45 },
	{ year: "1958 年", sales: 48 },
	{ year: "1959 年", sales: 38 },
	{ year: "1960 年", sales: 38 },
	{ year: "1962 年", sales: 38 },
];

function Demo() {
	return (
		<Chart
			height={400}
			autoFit
			data={data}
			interactions={["active-region", "element-cursor-pointer", 'element-active']}
			padding={[30, 30, 30, 50]}
		>
			<Interval position="year*sales" state={{
				active: {
					style: {
						stroke: 'red'
					}
				}
			}} />
			<Tooltip shared />
		</Chart>
	);
}

ReactDOM.render(<Demo />, mountNode);

```

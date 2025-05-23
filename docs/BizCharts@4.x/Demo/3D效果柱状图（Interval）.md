# 3D效果柱状图（Interval）

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/7b7e2b30-a676-11eb-a867-8920ad95f086.png)

```js
import { Chart, Interval, registerShape } from "bizcharts";

const data = [
	{ year: "1951 年", sales: -20 },
	{ year: "1952 年", sales: 52 },
	{ year: "1956 年", sales: 61 },
	{ year: "1957 年", sales: 45 },
	{ year: "1958 年", sales: 48 },
	{ year: "1959 年", sales: 38 },
	{ year: "1960 年", sales: 38 },
	{ year: "1962 年", sales: 38 },
];

registerShape("interval", "3d", {
	draw(cfg, container) {
		const { points, color, defaultStyle } = cfg;
		let path = [];
		path.push(["M", points[0].x, points[0].y]);
		path.push(["L", points[1].x, points[1].y]);
		path.push(["L", points[2].x, points[2].y]);
		path.push(["L", points[3].x, points[3].y]);
		path.push("Z");
		path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
		const style = { ...defaultStyle };
		if (color) {
			style.fill = color;
		}
		const group = container.addGroup();
		const width = path[2][1] - path[1][1];
		const height = width / 2;
		const radius = width / 2;
		const disY = path[0][2] - path[1][2];
		const startY = path[0][2] - height / 2;
		const endY = disY > 0 ? path[1][2] + height / 2 : path[1][2] - height / 2;
		group.addShape("rect", {
			attrs: {
				x: path[1][1],
				y: endY,
				width: path[2][1] - path[1][1],
				height: startY - endY,
				fill: `l(90) 0:#fff 1:${style.fill}`,
			},
			zIndex: 0,
		});

		group.addShape("ellipse", {
			attrs: {
				x: path[1][1] + width / 2,
				y: startY,
				rx: radius,
				ry: height / 2,
				fill: `l(90) 0:transparent 0.5:${style.fill} 1:${style.fill}`,
			},
			zIndex: 1,
		});
		group.addShape("ellipse", {
			attrs: {
				x: path[1][1] + width / 2,
				y: endY,
				rx: radius,
				ry: height / 2,
				...style,
				fillOpacity: 0.25,
			},
			zIndex: 2,
		});

		return group;
	},
});

function Demo() {
	return (
		<Chart height={300} autoFit data={data}>
			<Interval shape="3d" position="year*sales" />
		</Chart>
	);
}

ReactDOM.render(<Demo />, mountNode);

```

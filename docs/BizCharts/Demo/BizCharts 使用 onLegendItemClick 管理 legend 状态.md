# BizCharts 使用 onLegendItemClick 管理 legend 状态

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/cbcf1670-fcb8-11ea-8f13-61bc40b8cb5c.png)

```js
import React from "react";
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
	Util
} from "bizcharts@3.5.8";

class Stackedcolumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeyActive: {
				London: true,
				Berlin: true,
			},
		};
	}

	onItemClick(e) {
		debugger
		// 由于 onLegendItemClick 的 checked 返回始终为 true，只能自行管理状态
		const { selectedKeyActive } = this.state;
		// 由于不可以所有 legend 皆为 false，所以当只有一个 legend 为false时不可再设定为 false
		const values = Object.values(selectedKeyActive);
		const trueValuesLength = values.filter(i => !!i).length;
		if (trueValuesLength === 1 && !e.target._cfg.checked) {
			return;
		}

		selectedKeyActive[e.data.value] = !selectedKeyActive[e.data.value];
		this.setState({
			selectedKeyActive: { ...selectedKeyActive },
		});
		console.log(selectedKeyActive)
	}

	render() {
		const { selectedKeyActive } = this.state;
		const data = [
			{ name: "London", 月份: "Jan.", 月均降雨量: 18.9, total: 21.3 },
			{ name: "London", 月份: "Feb.", 月均降雨量: 28.8, total: 52 },
			{ name: "London", 月份: "Mar.", 月均降雨量: 39.3, total: 73.8 },
			{ name: "London", 月份: "Apr.", 月均降雨量: 81.4, total: 181 },
			{ name: "London", 月份: "May", 月均降雨量: 47, total: 99.6 },
			{ name: "London", 月份: "Jun.", 月均降雨量: 20.3, total: 55.8 },
			{ name: "London", 月份: "Jul.", 月均降雨量: 24, total: 61.4 },
			{ name: "London", 月份: "Aug.", 月均降雨量: 35.6, total: 78 },
			{ name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4, total: 21.3 },
			{ name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2, total: 52, },
			{ name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5, total: 73.8 },
			{ name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7, total: 181 },
			{ name: "Berlin", 月份: "May", 月均降雨量: 52.6, total: 99.6 },
			{ name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5, total: 55.8 },
			{ name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4, total: 61.4 },
			{ name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4, total: 78 },
		];

		return (
			<div>
				<Chart
					height={400}
					onLegendItemClick={this.onItemClick.bind(this)}
					data={data}
					forceFit
				>
					<Legend />
					<Axis name="月份" />
					<Axis name="月均降雨量" />
					<Tooltip />
					<Geom
						type="intervalStack"
						position="月份*月均降雨量"
						color={"name"}
						style={{
							stroke: "#fff",
							lineWidth: 1
						}}
					>
						<Label
							content="total"
							formatter={(text, item, index) => {
								// 仅显示 最上面一组的 label 达成总数显示需求
								// 当状态都激活时，显示总数
								if (selectedKeyActive.London && selectedKeyActive.Berlin) {
									if (item._origin.name === 'London') {
										return item.point.total;
									}
								}
								if (selectedKeyActive.London && !selectedKeyActive.Berlin) {
									return item.point['月均降雨量'];
								}
								if (!selectedKeyActive.London && selectedKeyActive.Berlin) {
									return item.point['月均降雨量'];
								}
								return null;
							}}
						/>
					</Geom>
				</Chart>
			</div>
		);
	}
}

ReactDOM.render(<Stackedcolumn />, mountNode)

```

# 双轴图隐藏Y轴

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/eca5f480-0f88-11eb-a381-f150021acaf9.png)

```js
/**
 * biaxial
 */

import React from 'react';
import { Chart, Geom, Axis, Legend, Tooltip, Label } from 'bizcharts@3.5.8';

let data = [
	{ month: 'Jan', rainfall: 49.9, seaLevelPressure: 1016, temperature: 7 },
	{ month: 'Feb', rainfall: 71.5, seaLevelPressure: 1016, temperature: 6.9 },
	{ month: 'Mar', rainfall: 106.4, seaLevelPressure: 1015.9, temperature: 9.5 },
	{ month: 'Apr', rainfall: 129.2, seaLevelPressure: 1015.5, temperature: 14.5 },
	{ month: 'May', rainfall: 144, seaLevelPressure: 612.3, temperature: 18.2 },
	{ month: 'Jun', rainfall: 176, seaLevelPressure: 809.5, temperature: 21.5 },
	{ month: 'Jul', rainfall: 135.6, seaLevelPressure: 1009.6, temperature: 25.2 },
	{ month: 'Aug', rainfall: 148.5, seaLevelPressure: 1010.2, temperature: 26.5 },
	{ month: 'Sep', rainfall: 216.4, seaLevelPressure: 503.1, temperature: 23.3 },
	{ month: 'Oct', rainfall: 194.1, seaLevelPressure: 1016.9, temperature: 18.3 },
	{ month: 'Nov', rainfall: 95.6, seaLevelPressure: 1018.2, temperature: 13.9 },
	{ month: 'Dec', rainfall: 54.4, seaLevelPressure: 1016.7, temperature: 9.6 },
];
data = data.map(item => {
	return {
		...item,
		seaLevelPressureCopy: item.seaLevelPressure
	}
})

const scale1 = {
	month: {
		alias: '2018年（month）',
	},
	rainfall: {
		min: 0,
		tickCount: 7,
		alias: '雨量（mm）',
	},
	seaLevelPressure: {
		min: 0,
		tickCount: 7,
		alias: '气压（mb）',
	},
	seaLevelPressureCopy: {
		min: 0,
		tickCount: 7,
		alias: '气压（mb）',
	},
};

const scale2 = {
	month: {
		alias: '2018年（month）',
	},
	rainfall: {
		min: 0,
		max: 1100,
		tickCount: 10,
		alias: '雨量（mm）',
	},
	seaLevelPressure: {
		min: 0,
		max: 1100,
		tickCount: 10,
		alias: '气压（mb）',
	},
};

const label = {
	month: {
		formatter: val => `${val} .`, // 格式化坐标轴显示
		textStyle: {
			fill: '#e5d981',
			rotate: 100,
		},
	},
	rainfall: {
		formatter: val => `${val}`, // 格式化坐标轴显示
		textStyle: {
			// fill: '#f33274',
			// rotate : 60
		},
	},
	seaLevelPressure: {
		formatter: val => `${val}`, // 格式化坐标轴显示
		textStyle: {
			fill: 'red',
			// rotate : 60
		},
	},
};

const crosshairs = {
	type: 'rect',
  /* style: {
    lineWidth:0,
      stroke:"#eee",
  } */
};

const geomLabel = {
	rainfall: {
		labelLine: {
			lineWidth: 1, // 线的粗细
			stroke: '#ff8800', // 线的颜色
			lineDash: [2, 2], // 虚线样式
		},
		content: ['month*rainfall', (month, rainfall) => `${rainfall}mm`],
	},
};

// 默认选中第三项的结果
const handleAlwaysShowTooltip = (chartIns) => {
	chartIns.showTooltip(chartIns.getXY(data[1]));
};

const styles = {
	wrapper: {
		width: 700,
		height: 500,
		overflow: 'auto',
		textAlign: 'center',
		padding: 10,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	mainTitle: {
		fontSize: 18,
		color: '#333',
		display: 'block',
		padding: 10,
	},
	subTitle: {
		fontSize: 14,
		color: '#bbb',
		display: 'block',
		padding: 10,
	},
};

class GalleryBiaxial extends React.Component {
	render() {
		return (
			<div style={styles.wrapper}>
				<Chart
					height={400}
					data={data}
					scale={scale1}
					forceFit
					padding={[60, 150, 160, 60]}
					onGetG2Instance={handleAlwaysShowTooltip}
				>
					<span className="main-title" style={styles.mainTitle}>
						双轴图
          </span>
					<span className="sub-title" style={styles.subTitle}>
						设置左右刻度数tickCount相同
          </span>
					<Axis name="month" title />
					<Axis name="rainfall" label={label.rainfall} title />
					<Axis name="seaLevelPressure" label={label.seaLevelPressure} title />
					<Legend position="bottom" />
					<Tooltip crosshairs={crosshairs} />
					<Geom type="interval" position="month*rainfall" color="#a8de4d">
						<Label content={geomLabel.rainfall.content} labelLine={geomLabel.rainfall.labelLine} />
					</Geom>
					<Geom
						type="line"
						position="month*seaLevelPressure"
						color="#f99540"
						shape="smooth"
						size={2}
						label={label.seaLevelPressure}
					/>
					<Geom
						type="point"
						position="month*seaLevelPressure"
						color="#f33274"
						shape="circle"
						size={4}
					/>
				</Chart>

				<Chart
					height={400}
					data={data}
					scale={scale2}
					forceFit
					padding={[60, 70, 160, 60]}
					onGetG2Instance={handleAlwaysShowTooltip}
				>
					<span className="main-title" style={styles.mainTitle}>
						隐藏Y轴
          </span>
					<span className="sub-title" style={styles.subTitle}>
						控制scale的min和max，设置axis的visble为false来隐藏一个Y轴
          </span>
					<Axis name="month" title />
					<Axis name="rainfall" label={label.rainfall} title />
					<Axis name="seaLevelPressure" label={label.seaLevelPressure} title visible={false} />
					<Legend position="bottom" />
					<Tooltip crosshairs={crosshairs} />
					<Geom type="interval" position="month*rainfall" color="#a8de4d">
						<Label content={geomLabel.rainfall.content} labelLine={geomLabel.rainfall.labelLine} />
					</Geom>
					<Geom
						type="line"
						position="month*seaLevelPressure"
						color="#f99540"
						shape="smooth"
						size={2}
						label={label.seaLevelPressure}
					/>
					<Geom
						type="point"
						position="month*seaLevelPressure"
						color="#f33274"
						shape="circle"
						size={4}
					/>
				</Chart>
			</div>
		);
	}
}

ReactDOM.render(<GalleryBiaxial />, mountNode)

```

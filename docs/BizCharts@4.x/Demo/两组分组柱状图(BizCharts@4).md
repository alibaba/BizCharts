# 两组分组柱状图(BizCharts@4)

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/4c6ea610-7a59-11eb-b6ac-c11ccf54cc02.png)

```js
import React from "react";
import {
  Chart,
	View,
  Interval,
	Legend,
	Slider,
} from "bizcharts";

const data1 = [
  { name: '预测收入', month: '20.06.01-20.06.07', value: 18.9 },
  { name: '预测收入', month: '20.06.08-20.06.14', value: 28.8 },
  { name: '预测收入', month: '20.06.15-20.06.21', value: 39.3 },
  { name: '预测收入', month: '20.06.22-20.06.28', value: 81.4 },
  { name: '实际收入', month: '20.06.01-20.06.07', value: 12.4 },
  { name: '实际收入', month: '20.06.08-20.06.14', value: 23.2 },
  { name: '实际收入', month: '20.06.15-20.06.21', value: 34.5 },
  { name: '实际收入', month: '20.06.22-20.06.28', value: 99.7 },

  { item: '预测支出', month: '20.06.01-20.06.07', value: -18.9 },
  { item: '预测支出', month: '20.06.08-20.06.14', value: -28.8 },
  { item: '预测支出', month: '20.06.15-20.06.21', value: -39.3 },
  { item: '预测支出', month: '20.06.22-20.06.28', value: -81.4 },
  { item: '实际支出', month: '20.06.01-20.06.07', value: -12.4 },
  { item: '实际支出', month: '20.06.08-20.06.14', value: -23.2 },
  { item: '实际支出', month: '20.06.15-20.06.21', value: -34.5 },
  { item: '实际支出', month: '20.06.22-20.06.28', value: -99.7 },
];

const colors = ['#193EC1', '#4E76FE', '#1A2D6F', '#394D96'];

let chartIns = null;

function Grouped() {
  return (
    <Chart height={370} data={data1} padding={[40, 40, 50, 40]} autoFit onGetG2Instance={chart => { chartIns = chart; }}
		scale={{ value: { min: -100, max: 100 }, name: {
			values: ['实际收入','预测收入'],
			
		}, item: {
			values: ['预测支出','实际支出'],
			
		} } }>
      <Interval
					adjust={[
					{
							type: 'dodge',
							marginRatio: 0,
							dodgeBy:"name"
						},
					]}
					color={['name', [colors[0], colors[1]]]}
				
					position="month*value"
				/>
			<Interval
					adjust={[
					{
							type: 'dodge',
							marginRatio: 0,
						},
					]}
					color={['item', [colors[2], colors[3]]]}
					position="month*value"
				/>
			<Legend
        custom={true}
        itemSpacing={10}
        layout="horizontal"
        position="top-left"
        flipPage={false}
        offsetX="50"
        offsetY="15"
				onChange={ev => {
					const item = ev.item;
					const value = item.value;
					const checked = !item.unchecked;
					const geoms = chartIns.geometries;

					for (let i = 0; i < geoms.length; i++) {
						const geom = geoms[i];

						if (geom.getYScale().field === value) {
							if (checked) {
								geom.show();
							} else {
								geom.hide();
							}
						}
					}
				}}
        items={[
          {
            value: '预测收入',
            name: '预测收入',
            marker: {
              symbol: 'circle',
              style: { fill: colors[0] },
            },
          },
          {
            value: '实际收入',
            name: '实际收入',
            marker: {
              symbol: 'circle',
              style: { fill: colors[1] },
            },
          },
          {
            value: '预测支出',
            name: '预测支出',
            marker: {
              symbol: 'circle',
              style: { fill: colors[2] },
            },
          },
          {
            value: '实际支出',
            name: '实际支出',
            marker: {
              symbol: 'circle',
              style: { fill: colors[3] },
            },
          },
        ]}
      />
			<Slider
        height={14}
        textStyle={{ fill: '#989EA5' }}
        foregroundStyle={{ fill: '#0F2764' }}
				padding={[0,0,0,0]}
        handlerStyle={{
          style: {
            fill: '#6B7180',
          },
        }}
      />
    </Chart>
  );
}

ReactDOM.render(<Grouped />, mountNode)

```

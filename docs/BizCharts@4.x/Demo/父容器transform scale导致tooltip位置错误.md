# 父容器transform scale导致tooltip位置错误

![预览](http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/de29c6e0-1fdf-11eb-85d9-95fcbab24c56.png)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Interval, G2 } from 'bizcharts@4.0.14';

/**
 * 在G2初始化前，替换 G.Canvas.getPointByClient 函数，适配CSS缩放的场景。
* */

// 获取Canvas，不同版本略有差别
// 3.x
// const { Canvas } = G2.G;
// 4.x
const { Canvas } = G2.getEngine('canvas');

// 后续操作一样
// 原始的计算坐标方法
const rawGetPointByClient = Canvas.prototype.getPointByClient;
// 由于需要运行时this指针，这个函数不可改为箭头函数。
Canvas.prototype.getPointByClient = function(clientX, clientY) {
  // 获取原函数返回的坐标值
  const raw = rawGetPointByClient.call(this, clientX, clientY);
  // 获取设定高宽和真实高宽。
  // 当设定的高宽不等于getBoundingClientRect获取的高宽时，说明存在缩放。
  const el = this.get('el');
  const bbox = el.getBoundingClientRect();
  const setWidth = this.get('width');
  const setHeight = this.get('height');
  const { width: realWidth, height: realHeight } = bbox;
  // 除以缩放比（真实高宽 / 设定高宽）获得真实的坐标。
  return {
    x: raw.x / (realWidth / setWidth),
    y: raw.y / (realHeight / setHeight),
  };
};

// 数据源
const data = [
	{
		month: "Jan",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan",
		city: "London",
		temperature: 3.9
	},
	{
		month: "Feb",
		city: "Tokyo",
		temperature: 13
	},
	{
		month: "Feb",
		city: "London",
		temperature: 4.2
	},
	{
		month: "Mar",
		city: "Tokyo",
		temperature: 16.5
	},
	{
		month: "Mar",
		city: "London",
		temperature: 5.7
	},
	{
		month: "Apr",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Apr",
		city: "London",
		temperature: 8.5
	},
	{
		month: "May",
		city: "Tokyo",
		temperature: 10
	},
	{
		month: "May",
		city: "London",
		temperature: 11.9
	},
	{
		month: "Jun",
		city: "Tokyo",
		temperature: 7.5
	},
	{
		month: "Jun",
		city: "London",
		temperature: 15.2
	},
	{
		month: "Jul",
		city: "Tokyo",
		temperature: 9.2
	},
	{
		month: "Jul",
		city: "London",
		temperature: 17
	},
	{
		month: "Aug",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Aug",
		city: "London",
		temperature: 16.6
	},
	{
		month: "Sep",
		city: "Tokyo",
		temperature: 9.3
	},
	{
		month: "Sep",
		city: "London",
		temperature: 14.2
	},
	{
		month: "Oct",
		city: "Tokyo",
		temperature: 8.3
	},
	{
		month: "Oct",
		city: "London",
		temperature: 10.3
	},
	{
		month: "Nov",
		city: "Tokyo",
		temperature: 8.9
	},
	{
		month: "Nov",
		city: "London",
		temperature: 5.6
	},
	{
		month: "Dec",
		city: "Tokyo",
		temperature: 5.6
	},
	{
		month: "Dec",
		city: "London",
		temperature: 9.8
	}
];

function Demo() {
	return (
		<div style={{transform: 'scale(0.5)'}}>
      <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data} >
				<Interval
					shape="smooth"
					point
					area
					position="month*temperature"
					color="city"
				/>
			</Chart>
	  </div>
		)
	
}


ReactDOM.render(<Demo />, mountNode);



```

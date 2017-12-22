import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text, Html, Arc, Line } = Guide;
const data1 = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const cols = {
  'sales': {tickInterval: 20,'alias':"请显示我！！！"},
};
const position = ['top','bottom','left','right']
const titlePosition=['center', 'start', 'end']
const textBaseline=['top', 'middle', 'bottom']
const labelTextAlign=['middle', 'start', 'end']
const gridType=['line', 'polygon']
function genColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
        data: data1,
        position: 'bottom',
        boolean: true,
        titleOffset:Math.floor(Math.random()*50),
        titleColor:genColor(),
        titlePosition: titlePosition[Math.floor(Math.random()*3)],
        labelTextAlign: labelTextAlign[Math.floor(Math.random()*3)],
        gridType: gridType[Math.floor(Math.random()*2)],
        lineStroke:genColor(),
        lineFill:genColor(),
        lineWidth:Math.floor(Math.random()*30),
        lineDash:[Math.floor(Math.random()*2+1),Math.floor(Math.random()*3-1),],
        tickLineWidth:Math.floor(Math.random()*5),
        tickLineStroke:genColor(),
        tickLineStrokeOpacity:Math.floor(Math.random()),
        tickLineLength:Math.floor(Math.random()*40-20),
        fontSize:Math.floor(Math.random()*10+12),
        subTickCount:Math.floor(Math.random()*10+5),
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        position: position[Math.floor(Math.random()*5)],
        boolean: this.state.boolean === true ? false : true,
        titleOffset:Math.floor(Math.random()*50),
        titleColor:genColor(),
        titlePosition: titlePosition[Math.floor(Math.random()*3)],
        labelTextAlign: labelTextAlign[Math.floor(Math.random()*3)],
        lineStroke:genColor(),
        lineFill:genColor(),
        lineWidth:Math.floor(Math.random()*30),
        lineDash:[Math.floor(Math.random()*2+1),Math.floor(Math.random()*3-1),],
        tickLineWidth:Math.floor(Math.random()*5),
        tickLineStroke:genColor(),
        tickLineStrokeOpacity:Math.floor(Math.random()),
        tickLineLength:Math.floor(Math.random()*40-20),
        fontSize:Math.floor(Math.random()*10+12),
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={this.state.data} scale={cols} forceFit>
        <View data={this.state.data} scale={cols}>
        <Axis
          name="year"
          visible={this.state.boolean}
          position={this.state.position}
          title={{
            autoRotate: this.state.boolean ,// 是否需要自动旋转，默认为 true
            offset: this.state.titleOffset, // 设置标题 title 距离坐标轴线的距离
            textStyle: {
              fontSize: this.state.fontSize,
              textAlign: this.state.labelTextAlign,
              fill: this.state.titleColor,
              fontWeight: 'bold',
              // rotate: {角度}
            }, // 坐标轴文本属性配置
            position: this.state.titlePosition, // 标题的位置，**新增**
          }}
          line={{
            stroke: this.state.lineStroke,
            fill: this.state.lineFill,
            lineDash: this.state.lineDash,
            lineWidth: this.state.lineWidth
          }}
          subTickCount={this.state.subTickCount}
          subTickLine={//可配置样式
            {
              lineWidth: this.state.tickLineWidth, // 子刻度线宽
              stroke: this.state.lineStroke, // 子刻度线颜色
              length: this.state.tickLineLength, // 自刻度线的长度
            }}
        />
        <Axis
          name="sales"
          tickLine={{
            lineWidth: this.state.tickLineWidth, // 刻度线宽
            stroke: this.state.tickLineStroke, // 刻度线的颜色
            strokeOpacity:this.state.tickLineStrokeOpacity, // 刻度线颜色的透明度
            length: this.state.tickLineLength, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
          }}
          label={{
            offset: this.state.titleOffset, // 设置坐标轴文本 label 距离坐标轴线的距离
            textStyle: {
              textAlign: this.state.labelTextAlign, // 文本对齐方向，可取值为： start middle end
              fill: this.state.titleColor, // 文本的颜色
              fontSize: this.state.fontSize, // 文本大小
              fontWeight: 'bold', // 文本粗细
              rotate: 30,
              textBaseline: this.state.textBaseline // 文本基准线，可取 top middle bottom，默认为middle
            } // || {Function}, // 支持回调
            // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
            // formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
            // htmlTemplate: {Function}, // 使用 html 自定义 label
          }}
          grid={{
            align: this.state.titlePosition, // 网格顶点从两个刻度中间开始
            type: this.state.gridType, // 网格的类型
            lineStyle: {
            stroke: this.state.titleColor, // 网格线的颜色
            lineWidth:this.state.tickLineWidth,// 网格线的宽度复制代码
            lineDash: this.state.lineDash, // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
            }, // 网格线的样式配置，原有属性为 line
            alternateColor: [this.state.lineStroke, this.state.titleColor], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
          }}
        />
        <Geom type="interval" position="year*sales" />
      </View>
    </Chart>
    );
  }
}

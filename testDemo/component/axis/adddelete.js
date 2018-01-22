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
const data2 = [
  { year: '1951 年', sales: 28 },
  { year: '1952 年', sales: 62 },
  { year: '1956 年', sales: 31 },
  { year: '1957 年', sales: 105 },
  { year: '1958 年', sales: 148 },
  { year: '1959 年', sales: 8 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 98 },
];
const cols = {
  'sales': {tickInterval: 20,'alias':"请显示我！！！"},
};
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
        data: data1,
        position: 'bottom',
        boolean: true
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.state.data == data1 ? data2 : data1,
      });
    }, 1000);
  }
  render() {
    const style={fontSize: '12'}
    return (
      <Chart height={400} data={this.state.data} scale={cols} forceFit className='hello world' style={style} >
      <Axis
      name="year"
      // visible={this.state.boolean}
      // position={this.state.position}
      title={{
        // autoRotate: this.state.boolean ,// 是否需要自动旋转，默认为 true
        offset: 50, // 设置标题 title 距离坐标轴线的距离
        textStyle: {
          fontSize: '12',
          textAlign: 'center',
          fill: '#999',
          fontWeight: 'bold',
          // rotate: {角度}
        }, // 坐标轴文本属性配置
        position: 'center' || 'start' || 'end', // 标题的位置，**新增**
      }}
      line={{
        stroke: 'dddddd',
        fill: '#ffffff',
        lineDash: [2, 3],
        lineWidth: 3
      }}
      tickLine={{
        lineWidth: 1, // 刻度线宽
        stroke: '#ccc', // 刻度线的颜色
        strokeOpacity: 0.5, // 刻度线颜色的透明度
        length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
      }}
      label={{
        offset: 12, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fill: '#404040', // 文本的颜色
        fontSize: '12', // 文本大小
        fontWeight: 'bold', // 文本粗细
        rotate: 30,
        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        } // || {Function}, // 支持回调
        // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
        // formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
        // htmlTemplate: {Function}, // 使用 html 自定义 label
      }}
      grid={{
        align: 'center', // 网格顶点从两个刻度中间开始
        type: 'line' || 'polygon', // 网格的类型
        lineStyle: {
        stroke: '#d9d9d9', // 网格线的颜色
        lineWidth: 1, // 网格线的宽度复制代码
        lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
        }, // 网格线的样式配置，原有属性为 line
        alternateColor: ['#f80', '#ccc',], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
      }}
      subTickCount={10}
      subTickLine={//可配置样式
        {
          lineWidth: 1, // 子刻度线宽
          stroke: '#ddd', // 子刻度线颜色
          length: 3, // 自刻度线的长度
        }}
      />
      <Axis name="sales"
           // visible={this.state.boolean}
      // position={this.state.position}
      title={{
        // autoRotate: this.state.boolean ,// 是否需要自动旋转，默认为 true
        offset: 50, // 设置标题 title 距离坐标轴线的距离
        textStyle: {
          fontSize: '12',
          textAlign: 'center',
          fill: '#999',
          fontWeight: 'bold',
          // rotate: {角度}
        }, // 坐标轴文本属性配置
        position: 'center' || 'start' || 'end', // 标题的位置，**新增**
      }}
      line={{
        stroke: 'dddddd',
        fill: '#ffffff',
        lineDash: [2, 2, 3],
        lineWidth: 3
      }}
      tickLine={{
        lineWidth: 1, // 刻度线宽
        stroke: '#ccc', // 刻度线的颜色
        strokeOpacity: 0.5, // 刻度线颜色的透明度
        length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
      }}
      label={{
        offset: 12, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fill: '#404040', // 文本的颜色
        fontSize: '12', // 文本大小
        fontWeight: 'bold', // 文本粗细
        rotate: 30,
        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        } // || {Function}, // 支持回调
        // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
        // formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
        // htmlTemplate: {Function}, // 使用 html 自定义 label
      }}
      grid={{
        align: 'center', // 网格顶点从两个刻度中间开始
        type: 'line' || 'polygon', // 网格的类型
        lineStyle: {
        stroke: '#d9d9d9', // 网格线的颜色
        lineWidth: 1, // 网格线的宽度复制代码
        lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
        }, // 网格线的样式配置，原有属性为 line
        alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
      }}
      subTickCount={10}
      subTickLine={//可配置样式
        {
          lineWidth: 1, // 子刻度线宽
          stroke: '#ddd', // 子刻度线颜色
          length: 3, // 自刻度线的长度
        }}
      />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="interval" position="year*sales" />
    </Chart>
    );
  }
}

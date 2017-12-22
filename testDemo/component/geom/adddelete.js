
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
const typeAry=['point','path','line','area','interval','polygon','edge','schema','heatmap'];
export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
        data: data1,
        position: 'bottom',
        typeAry:'interval',
        boolean: true
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.state.data == data1 ? data2 : data1,
        typeAry:typeAry[Math.floor(Math.random()*9)]
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={this.state.data} scale={cols} forceFit>
      <Axis
      />
      <Axis name="sales"
      />
      <Tooltip crosshairs={{type : "y"}}/>
      {this.state.typeAry==='interval' &&<Geom
       type="interval"
      //  adjust='stack' // 失败可能是只有一组数据的原因
      color='sales'
      shape={['sales', ['diamond', 'square' ]]}
      // size={['sales', (count)=>{
      //   if(count > 50)
      //     return 100;
      //   else return 50;
      // }]}
      opacity='sales'
      style={{ // 统一为所有 shape 设置固定的样式
        lineWidth: 2,
        stroke: '#ddd',
      }}
      tooltip={['year*sales', (sales, year)=>{
        return {
        name:'year',
        value:year + ':' + sales
      }
      }]}
      select={[true, {
        mode: 'single' || 'multiple', // 选中模式，单选、多选
      style: { }, // 选中后 shape 的样式
      cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
      animate: true | false // 选中是否执行动画，默认执行动画
      }]}
      Active={false}
      animate={{
        animation: 'fadeIn', // 动画名称
        easing: 'easeInQuart', // 动画缓动效果
        delay: 100, // 动画延迟执行时间
        duration: 600 // 动画执行时间
        }}
      position="year*sales"
      />}
      {this.state.typeAry==='point' &&<Geom
       type="point"
      //  adjust='stack' // 失败可能是只有一组数据的原因
      color='sales'
      shape={['sales', ['diamond', 'square' ]]}
      // size={['sales', (count)=>{
      //   if(count > 50)
      //     return 100;
      //   else return 50;
      // }]}
      opacity='sales'
      style={{ // 统一为所有 shape 设置固定的样式
        lineWidth: 2,
        stroke: '#ddd',
      }}
      tooltip={['year*sales', (sales, year)=>{
        return {
        name:'year',
        value:year + ':' + sales
      }
      }]}
      select={[true, {
        mode: 'single' || 'multiple', // 选中模式，单选、多选
      style: { }, // 选中后 shape 的样式
      cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
      animate: true | false // 选中是否执行动画，默认执行动画
      }]}
      Active={false}
      animate={{
        animation: 'fadeIn', // 动画名称
        easing: 'easeInQuart', // 动画缓动效果
        delay: 100, // 动画延迟执行时间
        duration: 600 // 动画执行时间
        }}
      position="year*sales"
      />}
       {this.state.typeAry==='path' &&<Geom type="path" position="year*sales" />}
       {this.state.typeAry==='line' &&<Geom type="line" position="year*sales" />}
       {this.state.typeAry==='area' &&<Geom type="area" position="year*sales" />}
       {this.state.typeAry==='polygon' &&<Geom type="area" position="year*sales" />}
       {this.state.typeAry==='edge' &&<Geom type="edge" position="year*sales" />}
       {this.state.typeAry==='schema' &&<Geom type="area" position="year*sales" />}
       {this.state.typeAry==='heatmap' &&<Geom type="area" position="year*sales" />}

    </Chart>
    );
  }
}

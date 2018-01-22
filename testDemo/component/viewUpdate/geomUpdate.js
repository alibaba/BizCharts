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
        <View
          start={{x:0, y:0}}
          end={{x:0.5, y:1}}
          data={this.state.data} 
          scale={cols}
        >
          <Axis/>
          <Tooltip crosshairs={{type : "y"}}/>
          <Geom
          type="point"
          //  adjust={{
          //   sales:[ 'stack','symmetric' ]
          // }}
          color='sales'
          shape={['sales', ['diamond', 'square' ]]}
          size={['sales', (count)=>{
            if(count > 50)
              return 100;
            else return 50;
          }]}
          opacity='sales'
          style={{ // 统一为所有 shape 设置固定的样式
            lineWidth: this.state.lineWidth,
            stroke: this.state.lineStroke,
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
          />
          <Geom
          type="line"
          //  adjust={{
          //   sales:[ 'stack','symmetric' ]
          // }}
          color='sales'
          size={['sales', (count)=>{
            if(count > 50)
              return 100;
            else return 50;
          }]}
          opacity='sales'
          style={{ // 统一为所有 shape 设置固定的样式
            lineWidth: this.state.lineWidth,
            stroke: this.state.lineStroke,
          }}
          tooltip={['year*sales', (sales, year)=>{
            return {
            name:'year',
            value:year + ':' + sales
          }
          }]}
          position="year*sales"
          />
        </View>
        <View
          start={{x:0.5, y:0}}
          end={{x:1, y:1}}
          data={this.state.data} 
          scale={cols}
        >
          <Axis/>
          <Tooltip crosshairs={{type : "y"}}/>
          <Geom
          type="point"
          color='sales'
          // shape={['sales', ['diamond', 'square' ]]}
          size={['sales', (count)=>{
            if(count > 50)
              return 100;
            else return 50;
          }]}
          opacity='sales'
          style={{ // 统一为所有 shape 设置固定的样式
            lineWidth: this.state.lineWidth,
            stroke: this.state.lineStroke,
          }}
          position="year*sales"
          />
        </View>
      </Chart>
    );
  }
}

import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text, Html, Arc, Line } = Guide;
const data1 = [
  { name:'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
  { name:'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.' :34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4}
];
const data2 = [
  { name:'Berlin', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
  { name:'London', 'Jan.': 12.3, 'Feb.': 13.2, 'Mar.' :24.5, 'Apr.': 89.7, 'May': 62.6, 'Jun.': 45.5, 'Jul.': 27.4, 'Aug.': 12.4}
];
const ds1 = new DataSet();
const dv1 = ds1.createView().source(data1);
dv1.transform({
  type: 'fold',
  fields: [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
  key: '月份', // key字段
  value: '月均降雨量', // value字段
});
const ds2 = new DataSet();
const dv2 = ds2.createView().source(data2);
dv2.transform({
  type: 'fold',
  fields: [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
  key: '月份', // key字段
  value: '月均降雨量', // value字段
});
const cols = {
  'sales': {tickInterval: 20,'alias':"请显示我！！！"},
};
const typeAry=['point','path','line','area','interval','edge'];
const position = ['top','bottom','left','right'];
const titlePosition=['center', 'start', 'end'];
const textBaseline=['top', 'middle', 'bottom'];
const labelTextAlign=['middle', 'start', 'end'];
const gridType=['line', 'polygon'];
const marker =['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down', 'hollowCircle', 'hollowSquare', 'hollowBowtie', 'hollowDiamond', 'hollowHexagon', 'hollowTriangle', 'hollowTriangle-down', 'cross', 'tick', 'plus', 'hyphen', 'line'];
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
        data: dv1,
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
        typeAry:typeAry[Math.floor(Math.random()*6)],
        marker:marker[Math.floor(Math.random()*19)]
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        position: position[Math.floor(Math.random()*5)],
        boolean: this.state.boolean === true ? false : true,
        // titleOffset:Math.floor(Math.random()*50),
        titleColor:genColor(),
        // titlePosition: titlePosition[Math.floor(Math.random()*3)],
        // labelTextAlign: labelTextAlign[Math.floor(Math.random()*3)],
        lineStroke:genColor(),
        lineFill:genColor(),
        // lineWidth:Math.floor(Math.random()*30),
        // lineDash:[Math.floor(Math.random()*2+1),Math.floor(Math.random()*3-1),],
        // tickLineWidth:Math.floor(Math.random()*5),
        tickLineStroke:genColor(),
        tickLineStrokeOpacity:Math.floor(Math.random()),
        tickLineLength:Math.floor(Math.random()*40-20),
        fontSize:Math.floor(Math.random()*10+12),
        typeAry:typeAry[Math.floor(Math.random()*6)],
        marker:marker[Math.floor(Math.random()*19)]
      });
    }, 1000);
  }
  render() {
    return (
      <Chart height={400} data={dv1} forceFit>
      <Axis name="月份"
      />
      <Axis name="月均降雨量"
      />
      <Legend
      // name={}
      visible={this.state.boolean}
      position={this.state.position}
      title={{
        textAlign: this.state.labelTextAlign, // 文本对齐方向，可取值为： start middle end
        fill: this.state.titleColor, // 文本的颜色
        fontSize: this.state.fontSize, // 文本大小
        fontWeight: 'bold', // 文本粗细
        rotate: this.state.titleOffset, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
        textBaseline: this.state.textBaseline // 文本基准线，可取 top middle bottom，默认为middle
      }}
      offsetX={this.state.titleOffset}
      offsetY={this.state.titleOffset}
      itemGap={this.state.titleOffset}
      itemMarginBottom={this.state.fontSize}
      itemWidth={this.state.fontSize}
      unCheckColor={this.state.titleColor}
      background={{
        fill: this.state.tickLineStroke,
        fillOpacity: this.state.tickLineStrokeOpacity
      }}
      allowAllCanceled={this.state.boolean}
      // itemFormatter={}
      marker={this.state.marker}
      textStyle={{
        fill:this.state.lineFill,
        stroke:this.state.lineStroke,
      }}
      clickable={this.state.boolean}
      hoverable={this.state.boolean}
      // selectedMode={'single' || 'multiple'}

      />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom
        type='interval'//
        adjust={[{type: 'dodge',marginRatio: 1/32}]}
        color='name'
        position="月份*月均降雨量"
      />
    </Chart>
    );
  }
}

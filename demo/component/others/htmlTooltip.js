import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';


const data = [
  {"month": '一月', "tem":7, "city": "tokyo" },
  {"month": '二月', "tem":6.9, "city": "tokyo" },
  {"month": '三月', "tem":9.5, "city": "tokyo" },
  {"month": '四月', "tem":14.5, "city": "tokyo" },
  {"month": '五月', "tem":18.2, "city": "tokyo" },
  {"month": '六月', "tem":21.5, "city": "tokyo" },
  {"month": '七月', "tem":25.2, "city": "tokyo" },
  {"month": '八月', "tem":26.5, "city": "tokyo" },
  {"month": '九月' , "tem":23.3, "city": "tokyo" },
  {"month": '十月', "tem":18.3, "city": "tokyo" },
  {"month": '十一月', "tem":13.9, "city": "tokyo" }
];


export default class IntervalC extends Component {
  render() {
    return (
      <Chart height={window.innerHeight} data={data} forceFit >
        <Axis name="month" />
        <Axis name="tem" />
        <Tooltip 
          containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
          itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
          offset={50}
          g2-tooltip={{
            position: 'absolute',
            visibility: 'hidden',
            border : '1px solid #efefef',
            backgroundColor: 'white',
            color: '#000',
            opacity: "0.8",
            padding: '5px 15px',
            'transition': 'top 200ms,left 200ms'
          }}  
          g2-tooltip-list={{
            margin: '10px'
          }}
        />
        <Geom type='line' position='month*tem' />
      </Chart>
    );
  }
}

import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
  { country: '中国', population: 131744 },
  { country: '印度', population: 104970 },
  { country: '美国', population: 29034 },
  { country: '印尼', population: 23489 },
  { country: '巴西', population: 18203 }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.source(data)
.transform({
  type: 'sort',
  callback(a, b) { // 排序依据，和原生js的排序callback一致
    return a.population - b.population > 0;
  }
});


export default class IntervalC extends Component {
  
  render() {
    return (
      <Chart height={400} data={dv} forceFit>
        <Coord transpose reflect="x" />
        <Axis name="country" label={{offset: 12}} />
        <Legend position='bottom'
  useHtml={true} 
  containerTpl={ '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">'
  + '<h4 class="g2-legend-title"></h4>' 
  + '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>'
  + '</div>'}
  itemTpl={(item,i,j,k,d) => {console.log(item,i,j,k.d); return('<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">'
  +item + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
  + '<span class="g2-legend-text">{value}</span>'
  + '</li>')}}
/>
        <Axis name="population" />
        <Tooltip />
        <Geom type="interval" position="country*population" />
      </Chart>
    );
  }
}

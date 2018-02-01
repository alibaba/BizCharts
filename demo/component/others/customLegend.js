import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';


const data = [
  { country: 'Lithuania', litres: 501.9 },
  { country: 'Czech Republic', litres: 301.9 },
  { country: 'Ireland', litres: 201.1 },
  { country: 'Germany', litres: 165.8 },
  { country: 'Australia', litres: 139.9 },
  { country: 'Austria', litres: 128.3 },
  { country: 'UK', litres: 99 },
  { country: 'Belgium', litres: 60 },
  { country: 'The Netherlands', litres: 50 }
];

const ds = new DataSet();
const dv = ds.createView()
  .source(data)
  .transform({
    type: 'percent',
    field: 'litres',
    dimension: 'country',
    as: 'percent'
  });
const scale = {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  },
  nice: false
}


export default class IntervalC extends Component {
  render() {
    return (
      <Chart height={window.innerHeight} padding={[ 200, 120, 20, 160 ]} data={dv} scale={scale} filter={[['country', (val) => {
            return val !== 'UK';
          }]]} forceFit >
          <Coord type="theta" innerRadius={0.3} radius={1} />
          <Tooltip showTitle={false} itemTpl='<li data-index={index}><span style="color:{color}">{name}:</span>{value}</li>' />
          <Legend 
            useHtml={true}
            position='right'
            containerTpl='<div class="g2-legend"><table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></table></div>'
            itemTpl={
              (value, color, checked, index) => {
                const obj = dv.rows[index];
                checked = checked ? 'checked' : 'unChecked';
                return '<tr class="g2-legend-list-item item-' + index + ' ' + checked +
                  '" data-value="' + value + '" data-color=' + color +
                  ' style="cursor: pointer;font-size: 14px;">' +
                  '<td width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
                  '<span class="g2-legend-text">' + value + '</span></td>' +
                  '<td style="text-align: right;border: none;padding:0;">' + obj.litres + '</td>' +
                  '</tr>';
              }
            }
            offsetX={15}
            g2-legend={{
              marginLeft: '100px',
              marginTop: '-107px'
            }}
            g2-legend-list={{
              border: 'none'
            }}
          />
          <Geom type='intervalStack' position='percent' color={['country', [ '#67b7dc', '#84b761', '#fdd400', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f' ]]}
          style={{lineWidth: 2,stroke: '#fff'}}
          >
          <Label 
            content="percent"
            formatter={
              (val, item) => {
                return item.point.country + ': ' + val;
              }
            }
          />
          </Geom>
        </Chart>
    );
  }
}

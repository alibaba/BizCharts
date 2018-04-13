import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text } = Guide;

let data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 }
];
const dv = new DataView().source(data);
dv.transform({
  type: 'percent',
  field: 'pv',
  dimension: 'action',
  as: 'percent'
});
data = dv.rows;
const cols = {
  percent: {
    nice: false
  }
}

export default class Basic extends Component {
  render() {
    return (
  <Chart height={window.innerHeight} data={data} scale={cols} padding={[ 20, 120, 95 ]} forceFit>
    <Tooltip showTitle={false} itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">浏览人数：{pv}</span><br/><span style="padding-left: 16px">占比：{percent}</span><br/></li>'/>
    <Coord type='rect' transpose scale={[1,-1]} />
		<Legend />
    <Guide>
      {data.map((obj,index) => {
        return  (<Text
          top={true}
          position={{
          action: obj.action,
          percent: 'median'}}
        	content={parseInt(obj.percent * 100) + '%'}
          style={{
          fill: '#fff',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'}}
        />)
      })}
    </Guide>
    <Geom type="intervalSymmetric" position="action*percent" shape='funnel' color={['action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ]]}
     tooltip={['action*pv*percent', (action, pv, percent) => {
      return {
        name: action,
        percent: parseInt(percent * 100) + '%',
        pv: pv
      };
    }]}
      >
    <Label content={['action*pv',(action, pv) => {
      return action + ' ' + pv;
    }]}
    offset={35}
    labeLine={{lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.15)'}}
      />
    </Geom>
  </Chart>
    );
  }
}

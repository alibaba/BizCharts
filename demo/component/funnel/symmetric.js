import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet } from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataView } = DataSet;
const { Text } = Guide;

const data = [
  { action: '访问', visitor: 500, site: '站点1' },
  { action: '浏览', visitor: 400, site: '站点1' },
  { action: '交互', visitor: 300, site: '站点1' },
  { action: '下单', visitor: 200, site: '站点1' },
  { action: '完成', visitor: 100, site: '站点1' },
  { action: '访问', visitor: 550, site: '站点2' },
  { action: '浏览', visitor: 420, site: '站点2' },
  { action: '交互', visitor: 280, site: '站点2' },
  { action: '下单', visitor: 150, site: '站点2' },
  { action: '完成', visitor: 80, site: '站点2' }
];
data.sort(function(obj1, obj2){ // 从小到大
  return obj1.visitor - obj2.visitor;
});


export default class Basic extends Component {
  
  render() {
    return(
    <Chart height={window.innerHeight} data={data} axis={false} padding={[ 30, 120, 95 ]} forceFit>
      <Tooltip showTitle={false} crosshairs={false} itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">{value}</span></li>' />
      <Legend reversed={true} />
      <Facet type='mirror' fields={[ 'site' ]} transpose={true} padding={0} >
        <View>
          <Geom type='interval' position='action*visitor' color={['action', [ '#BAE7FF', '#69C0FF', '#40A9FF', '#1890FF', '#0050B3' ]]} shape='funnel' tooltip={['site*action*visitor', (site, action, visitor) => {
                  return {
                    name: site,
                    value: action + ': ' + visitor
                  };
                }]}
            style={{lineWidth: 1,
            stroke: '#fff'}}/>
          <Guide>
            {data.map(obj => {
                return (
                  <Text top={true} position={[obj.action, 'min']} content={obj.visitor} style={{fill: '#fff',
                      fontSize: '12',
                          shadowBlur: 2,
                            shadowColor: 'rgba(0, 0, 0, .45)'}}
                    />
                )
              }
            )}
          </Guide>
        </View>
      </Facet>
    </Chart>
    )
  }

}
import React,  { Component } from 'react';
import { setTheme, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/relationship-with-weight.json';

const { DataView } = DataSet;
const { Text } = Guide;

const ds = new DataSet();
const dv = ds.createView().source(data, {
  type: 'graph',
  edges: d => d.links
});
dv.transform({
  type: 'diagram.arc',
  marginRatio: 0.5,
  // sortBy: 'frequency' // id, weight, frequency, {function}
});


export default class Arc extends Component {
  
  render() {
    setTheme("dark");    
    return (
      <div>
        <p>bizcharts do not support set chart's separate theme, just support setTheme global.
           so when this chart is opened, the all charts's theme is setted to dark.
        </p>
        <Chart  data={data} forceFit={true} height={window.innerHeight} >
          <Tooltip showTitle={false} />
          <View data={dv.edges} axis={false}>
            <Geom type='edge' position='x*y' shape='arc' color='source' opacity={0.5} tooltip={'source*target'} />
          </View>
          <View data={dv.nodes} axis={false}>
            <Geom type='point' position='x*y' shape='circle' size='value' color='id' opacity={0.5} style={{stroke:'grey'}} >
              <Label content='name' offset={-10} textStyle={{textAlign:'left', rotate:90, fill:'black'}} />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

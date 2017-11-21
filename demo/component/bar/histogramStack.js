import React,  { Component } from 'react';
import BizCharts from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/diamond.json'

const { Chart, Axis, Geom, Tooltip, Coord } = BizCharts;

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: 'bin.histogram',
    field: 'depth',
    binWidth: 1,
    // offset: -0.3,
    groupBy: [ 'cut' ],
    as: [ 'depth', 'count' ]
});

export default class IntervalC extends Component {
  
  render() {
    return (
      <Chart height={400} data={dv}  forceFit>
        <Axis name="depth" grid={{
              lineStyle: {
                  stroke: '#d9d9d9',
                  lineWidth: 1,
                  lineDash: [ 2, 2 ]
              }
          }} />
        <Axis name="count" />
        <Tooltip inPlot={false} crosshairs={false} position={'top'} />
        <Geom type='intervalStack' position="depth*count" color='cut' />
    </Chart>
    );
  }
}

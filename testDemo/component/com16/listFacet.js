import React,  { Component } from 'react';
import { Chart, Geom, Facet, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../data/diamond.json';
import { setTimeout } from 'timers';

const { DataView } = DataSet;
const { Text } = Guide;

const scale = {
  carat: {
    sync: true
  },
  price: {
    sync: true,
    tickCount: 3
  },
  cut: {
    sync: true
  }
};


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'list',
      showFacet: true,
      height: 400,
    };
  }

  componentDidMount() {
    setInterval(()=>{
      this.setState({
        type: this.state.type == 'list' ? 'rect' : 'list',
        showFacet: true,
        height: 800,
      });
    }, 2000);
  }
  
  render() {
    return (
      <Chart height={450} data={data} width={800} height={this.state.height} padding={[30, 80, 80, 80]} scale={scale}>
        <Tooltip />
        <Legend />
        {
          this.state.showFacet ?
          <Facet type={this.state.type} fields={['cut']} cols={3} padding={30} eachView={(view, facet)=>{
            view.point()
            .position('carat*price')
            .color('cut')
            .shape('circle')
            .opacity(0.3)
            .size(3); 
          }}>
          </Facet>
          :
          null
        }
        <Geom position='carat*price' type='interval' />
      </Chart>
    );
  }
}

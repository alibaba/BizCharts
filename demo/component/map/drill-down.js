import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import ChinaGeoJSON from '../../data/chinageo';
import DataSet from '@antv/data-set'; 
import PropTypes from 'prop-types';


function processData(mapData) {
  // 构造虚拟数据
  const userData = [];
  const features = mapData.features;
  for (let i = 0; i < features.length; i++) {
    const name = features[i].properties.name;
    userData.push({
      name: name,
      value: Math.round(Math.random() * 1000),
    });
  }
  const ds = new DataSet();
  const geoDataView = ds.createView().source(mapData, {
    type: 'GeoJSON',
  }); // geoJSON 经纬度数据

  // 用户数据
  const dvData = ds.createView().source(userData);
  dvData.transform({
    type: 'geo.region',
    field: 'name',
    geoDataView: geoDataView,
    as: ['longitude', 'lantitude'],
  });

  return dvData;
}

const mapData = ChinaGeoJSON['China'];
const chinaDv = processData(mapData);
const longitudeRange = chinaDv.range('longitude');
const lantitudeRange = chinaDv.range('lantitude');
const ratio = (longitudeRange[1] - longitudeRange[0]) / (lantitudeRange[1] - lantitudeRange[0]);


function calProvinceData(name) {
  if(document.getElementById("realContainer")) {
    ReactDOM.unmountComponentAtNode(document.getElementById("realContainer"));
  }
  const provinceData = ChinaGeoJSON[name];

  // provinceChart && provinceChart.destroy();
  if (!provinceData) {
    return;
  }
  const dv = processData(provinceData);
  // start: 计算地图的最佳宽高
  const longitudeRange = dv.range('longitude');
  const lantitudeRange = dv.range('longitude');
  const ratio2 = (longitudeRange[1] - longitudeRange[0]) / (lantitudeRange[1] - lantitudeRange[0]);

  let width;
  let height;
  if (ratio2 > 1) {
    width = 450;
    height = width / ratio2;
  } else {
    width = 350 * ratio2;
    height = 350;
  }

  return {
    provinceDv: dv,
    pWidth: width,
    pHeight: height,
  };
}

class China extends React.Component {

  static contextTypes = {
    updateProvince: PropTypes.func
  }

  onGetG2Ins = (chart) => {
    const shapes = chart.getAllGeoms()[0].getShapes();
    for (let i = 0, len = shapes.length; i < len; i++) {
      const shape = shapes[i];
      const origin = shape.get('origin')['_origin'];
      const name = origin.name;
      if (name === '浙江') {
        //calProvinceData(name);
        chart.getAllGeoms()[0].setShapeSelected(shape);
      }
    }
    this.chart = chart;
  }

  onPlotClick = (ev) => {
    const shape = ev.shape;
    if (!shape || !shape.name) {
      return false;
    }
    if (shape.get('selected')) {
      const item = shape.get('origin');
      const data = item['_origin'];
      const name = data.name;
      this.context.updateProvince(calProvinceData(name));
    } else {
    }
  }

  shouldComponentUpdate () {
    return false;
  }

  render() {
    return (
      <div>
        <Chart height={250/ratio} container='china' width={250} data={chinaDv}
          padding={0} animate={false}
          onGetG2Instance={this.onGetG2Ins}
          onPlotClick={this.onPlotClick}
        >
          <Tooltip showTitle={false} />
          <Geom
            type='polygon'
            position='longitude*lantitude'
            select={{
              // 设置是否允许选中以及选中样式
              mode: 'single', // 多选还是单选
              style: {
                fill: '#1890ff', // 选中的样式
              },
            }}
            tooltip='name'
            style={{
              lineWidth: 1,
              globalAlpha: 0.9,
              cursor: 'pointer',
              stroke: '#999',
              fill: '#e3e3e3',
              cursor: 'pointer',
            }}
            color={['count', [ 'rgb(200, 200, 255)', 'rgb(0, 0, 255)' ]]}
            />
        </Chart>
      </div>
    );
  }

}

class Province extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="provinceContainer">
        <Chart data={this.props.provinceDv} width={this.props.width} height={this.props.height} padding={0} >
          <Geom type="polygon" position='longitude*lantitude'
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
            color = {['value', '#BAE7FF-#1890FF-#0050B3']}
          >
            <Label content='name' 
              textStyle={{fill: '#fff',
                fontSize: 10,
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'}
              }
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}


export default class App extends React.Component {
  static childContextTypes = {
    updateProvince: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = calProvinceData("浙江");
  }

  getChildContext() {
    return {
      updateProvince: this.updateProvince,
    };
  }

  updateProvince = (config) => {
    this.setState(config)
  }

  render() {
    return (
    <div>
      <China />
      <Province provinceDv={this.state.provinceDv} width={this.state.pWidth} height={this.state.pHeight}/>
    </div>
    );
  }

}

import React from 'react';
import ReactDOM from 'react-dom';
import G2 from '@antv/g2';
window.G2 = G2;
import Slider from 'bizcharts-slider'
import { Chart, Facet } from 'bizcharts';
import DataSet from '@antv/data-set';
import data from './data/rain-flow.json';

const ds = new DataSet({
  state: {
    start: new Date('2009/7/20 0:00').getTime(),
    end: new Date('2009/9/9 0:00').getTime()
  }
});

const originDv = ds.createView('origin');
originDv.source(data)
  .transform({
    type: 'fold',
    fields: [ 'rain', 'flow' ],
    key: 'type',
    value: 'value',
    retains: [ 'rain', 'flow', 'time' ]
  });

const chartDv = ds.createView();
chartDv.source(originDv)
  .transform({
    type: 'fold',
    fields: [ 'rain', 'flow' ],
    key: 'type',
    value: 'value',
    retains: [ 'rain', 'flow', 'time' ]
  })
  .transform({
    type: 'filter',
    callback(obj) {
      const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
      return time >= ds.state.start && time <= ds.state.end;
    }
  });

const scale = {
  time: {
    type: 'time',
    tickCount: 10,
    mask: 'M/DD H:mm'
  }
};

export default class SliderChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: "auto",
      scale: scale,
      filler: {
        fill: '#BDCCED',
        fillOpacity: 0.3
      }
    };
  }

  componentDidMount() {
    setTimeout((function(){
      this.setState({
        filler: {
          fill: '#ff0000',
          fillOpacity: 0.3
        }
      });
    }).bind(this), 2000)
  }

  onChange = (obj) => {
    const { startValue, endValue, startText, endText } = obj;
    ds.setState('start', startValue);
    ds.setState('end', endValue);
  }
  
  render() {
    return (
      <div>
        <Chart height={window.innerHeight - 40} data={chartDv} padding={[20, 20, 0, 80]} scale={scale} forceFit>
          <Facet type='mirror' fields={['type']} showTitle={false} padding={[0, 0, 40, 0]} 
            eachView={(view, facet)=>{
              const { colValue, data } = facet;
              let color;
              let alias;
              if (colValue === 'rain') {
                color = '#1890ff';
                alias = '降雨量(mm)';
      
              } else if (colValue === 'flow') {
                color = '#2FC25B';
                alias = '流量(m^3/s)';
              }
              view.source(data, {
                [`${colValue}`]: {
                  alias
                }
              });
              view.axis(colValue, {
                title: {
                  autoRotate: false,
                  offset: -10,
                  position: 'end',
                  textStyle: {
                    textAlign: 'start'
                  }
                }
              });
              view.line().position('time*' + colValue).color(color);
          }}>
          </Facet>
        </Chart>
        <div>
          <Slider fillerStyle={this.state.filler} width={this.state.width} height={26} start={ds.state.start} end={ds.state.end}
            xAxis="time" yAxis='value' scales={this.state.scale} data={originDv} 
            backgroundChart={{type: 'line'}} 
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}


ReactDOM.render((
  <SliderChart />
), document.getElementById('root'));

import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import { setTimeout } from 'timers';

const { DataView } = DataSet;
const { Text, Html, Arc } = Guide;

function creatData(d) {
  const data = [];
  let val = Math.random() * 6;
  val = val.toFixed(1);
  if (!d) {
    data.push({value: val * 1});
  } else {
    data.push({value: d});
  }
  
  return data;
}

const data1 =creatData(4.5);
const data2 = creatData(0.1);


// 自定义Shape 部分
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    group.addShape('line', {
      attrs:  {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y - 20,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});

const color = ['#0086FA', '#FFBF00', '#F5222D'];
const cols = {
  'value': {
    min: 0,
    max: 6,
    tickInterval: 1,
    nice: false
  }
}

export default class Color extends Component {
  constructor() {
    super();
    this.state = {
      data: creatData(),
      lineWidth: 25,
    } 
  }
  componentDidMount() {
    const self = this;
    setInterval(function(){
      const data=creatData();
      // let data;
      // if (self.state.data == data1) {
      //   data = data2;
      // } else {
      //   data = data1;
      // }
      self.setState({
        data:data
      })
    }, 1000);
  }

  render() {
    const { data, lineWidth } = this.state;
    const val = data[0].value;
    return (
      <Chart height={window.innerHeight} data={this.state.data} scale={cols} padding={[ 0, 0, 200, 0 ]} forceFit>
        <Coord type='polar' startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
        <Axis name='value'
          zIndex={2}
          line={null}
          label={{
            offset: -20,
            textStyle: {
            fontSize: 18,
            fill: '#CBCBCB',
            textAlign: 'center',
            textBaseline: 'middle'
          }}}
          tickLine={{
            length: -24,
            stroke: '#fff',
            strokeOpacity: 1
          }}
        />
        <Axis name='1' visible={false}/>
        <Guide>
          <Arc zIndex={0} start={[ 0, 0.965 ]} end={[ 6, 0.965 ]}
            style={{ // 底灰色
            stroke: 'rgba(0, 0, 0, 0.09)',
            lineWidth
          }} />
          { val>=2 && <Arc zIndex={1} start={[ 0, 0.965 ]} end={[val, 0.965 ]}
            style={{ // 底灰色
              stroke: color[0],
                lineWidth
            }} />}
          { val>=4 && <Arc zIndex={1} start={[ 2, 0.965 ]} end={[4, 0.965 ]}
                        style={{ // 底灰色
                stroke: color[1],
                  lineWidth
              }} />}
          { val>=4 && val<6 && <Arc zIndex={1} start={[ 4, 0.965 ]} end={[val, 0.965 ]}
                        style={{ // 底灰色
                stroke: color[2],
                  lineWidth
              }} />} 
          { val>=2 && val<4 && <Arc zIndex={1} start={[ 2, 0.965 ]} end={[val, 0.965 ]}
              style={{ // 底灰色
                  stroke: color[1],
                  lineWidth
              }} />}
          { val<2 && <Arc zIndex={1} start={[ 0, 0.965 ]} end={[val, 0.965 ]}
              style={{ // 底灰色
                  stroke: color[0],
                  lineWidth
              }} />}         
          <Html  
            position={[ '50%', '95%' ]}
            html={() => {return ('<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">'+ val * 10+'%</p></div>')}}
          />
        </Guide>
        <Geom 
          type="point" 
          position="value*1" 
          shape='pointer' 
          color='#1890FF'
          active={false}
          style={{stroke: '#fff',lineWidth: 1}}
        />
      </Chart>
    );
  }
} 

import React, { Component } from 'react';
import moment from 'moment';
import { Chart, Geom, Axis, Tooltip, Guide, Label } from 'bizcharts';
import Utils from '../../../utils';

const { formatterNumber } = Utils;
const { Line, Text } = Guide;

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    this.setState({
      height: this.dom.clientHeight,
    });
  }

  render() {
    const { height } = this.state;
    const { data, type, last, double11, lastThree } = this.props;

    const linearColor = type === 'order' ? 'l (0) 0:#F76B1C 1:#FBDA61' : 'l (0) 0:#E2E85B 1:#70FABB';
    // 别名设置
    const cols = {
      time: {
        type: 'timeCat',
        formatter: dimValue => moment(parseInt(dimValue)).format('YYYY-MM-DD HH:mm:ss'),
      },
      value: {
        min: 0,
        alias: type === 'order' ? '成交订单' : '成交金额',
      },
    };

    return (
      <div className="line-container" ref={(dom) => { this.dom = dom; }}>
        <Chart
          height={height}
          data={data}
          padding={[20, 30, 40, 85]}
          scale={cols}
          forceFit
        >
          <Axis
            name="value"
            tickLine={null}
            title={null}
            line={{
              width: 1,
              stroke: '#323448',
            }}
            grid={{
              lineStyle: {
                lineWidth: 1,
                stroke: '#323448',
                lineDash: [2, 0],
              },
            }}
            label={{
              textStyle: {
                fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
                fill: '#6a7088',
              },
              formatter: (text) => {
                const val = parseInt(text, 10);
                return type === 'order' ? formatterNumber(val) : `${(val / 10000).toFixed(0)}万元`;
              },
            }}
          />
          <Axis
            name="time"
            tickLine={null}
            title={null}
            line={{
              width: 1,
              stroke: '#323448',
            }}
            label={{
              textStyle: {
                fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
                fill: '#6a7088',
              },
              formatter: (text) => {
                const dates = text.split(' ');
                const date = dates[0].split('-');
                const times = dates[1].split(':');
                const time = `${times[0]}:${times[1]}`;
                return times[0] === '00' ? `${time}(${date[1]}.${date[2]})` : time;
              },
            }}
          />
          <Tooltip
            crosshairs
            crossLine={{
              lineDash: [2, 3],
              lineWidth: 1,
              stroke: 'rgba(255, 255, 255, 0.3)',
            }}
          />
          <Geom type="area" position="time*value" shape="smooth" color="l (270) 0:#20252C 1:#2E3F8D" tooltip="*" />
          <Geom type="line" position="time*value" shape="smooth" color={linearColor} size={2} />
          <Geom
            type="point"
            position="time*value"
            shape="smooth"
            size={['time', (val) => {
              if (val === parseInt(data[data.length - 1].time)) {
                return 6;
              } else {
                return 0;
              }
            }]}
            style={{
              stroke: type === 'order' ? '#F89033' : '#D4EB67',
              fill: '#242536',
              lineWidth: 3,
            }}
          >
            <Label
              content="time*value"
              textStyle={{
                fill: '#fff',
                fontSize: 14,
                fontFamily: 'Arial,Microsoft YaHei,黑体,宋体,sans-serif',
              }}
              formatter={(text, item) => {
                const pt = item.point;
                if (pt.time === parseInt(data[data.length - 1].time)) {
                  return formatterNumber(pt.value);
                } else {
                  return '';
                }
              }}
            />
          </Geom>
          <Guide>
            {
              [[double11, '#B0BC5B'], [lastThree, '#FB497C'], [last, '#72F9B9']].map((item, index) => (
                <Line
                  key={index}
                  start={[data[0].time, item[0]]}
                  end={[data[data.length - 1].time, item[0]]}
                  lineStyle={{
                    stroke: item[1],
                  }}
                />
              ))
            }
            {
              [[double11, '去年双11数值'], [lastThree, '去年618数值x3'], [last, '去年618数值']].map((item, index) => (
                <Text
                  key={index}
                  position={[data[data.length - 1].time, item[0]]}
                  offsetX={5}
                  content={item[1]}
                  style={{
                    fill: '#6A7088',
                    fontSize: 10,
                    fontWeight: 'light',
                  }}
                />
              ))
            }
          </Guide>
        </Chart>
      </div>
    );
  }
}

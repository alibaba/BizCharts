import React from 'react';
import propTypes from 'prop-types';
import { Chart, Geom, Axis, Guide, Tooltip } from 'bizcharts';
import * as d3Time from 'd3-time';
import * as d3Scale from 'd3-scale';
import Tools from '../../utils/index';
import mixData from './mixData';
import './index.scss';

// const time = Tools.getUrlParameter('time');
// const paramTime = time || null;

const renderError2Tip = (d, city = {}) => `<div key=${city.name} class="error2-tip city-${city.name}" > ` +
    `<img src="${city.tipImg}" />` +
    "<div class='title'>异常趋势预警(K)</div>" +
    `<div class='text'>${d.value}</div>` +
    `<div class='line' style="background: ${city.color}"></div>` +
    '</div>';

class LineChart extends React.Component {
  static propTypes = {
    cityConfig: propTypes.array,
    data: propTypes.any,
  }

  static defaultProps = {
    cityConfig: [],
    data: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 1000,
    };
  }

  componentDidMount() {
    const wrapper = document.querySelector('.chart-wrapper');
    this.setState({
      width: wrapper.clientWidth - 40,
      height: wrapper.clientHeight - 37,
      refresh: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data && nextProps.cityConfig === this.props.cityConfig && !nextState.refresh) {
      return false;
    }
    return true;
  }

  getTimeScale(maxTime = new Date(), minTime) {
    const endTime = d3Time.timeSecond(1528879400000); // 测试数据时间
    console.log(maxTime);
    // const endTime = d3Time.timeSecond(paramTime || maxTime); // // 当前时间或者url param 的时间
    const breakTime = d3Time.timeSecond.offset(endTime, -300);
    const startTime = minTime || d3Time.timeSecond.offset(endTime, -1800);

    // 第一阶段比例尺
    const scaleX1 = d3Scale.scaleTime()
      .domain([startTime, breakTime])
      .range([0, this.rangeX[1]]); // 0--this.rangeX[1] (px) =》 0--76 tick

    // 第二阶段比例尺
    const scaleX2 = d3Scale.scaleTime()
      .domain([breakTime, endTime])
      .range([this.rangeX[1], this.rangeX[2]]); // this.rangeX[1]---this.rangeX[2] (px) =》 76---176 tick

    return { scaleX1, scaleX2, breakTime };
  }

  rangeX = [0, 450, 1000]; // 时间分段比例

  render() {
    const { cityConfig, data = [] } = this.props;
    const now = new Date().getTime() + 60000;
    const { width, height } = this.state;

    const { maxTime, minTime } = Object.keys(data).reduce(({ maxTime: m, minTime: n }, next) => {
      const compare = data[next].reduce(({ maxTime: max, minTime: min }, b) => ({
        maxTime: max > b.timestamp ? max : b.timestamp,
        minTime: min < b.timestamp ? min : b.timestamp,
      }), { maxTime: 0, minTime: now });
      return {
        maxTime: m > compare.maxTime ? m : compare.maxTime,
        minTime: n < compare.minTime ? n : compare.minTime,
      };
    }, { maxTime: 0, minTime: now });

    const { scaleX1, scaleX2, breakTime } = this.getTimeScale(maxTime, minTime); // 每次渲染重新计算一次

    const { mData, errors1, errors2 } = mixData(data, scaleX1, scaleX2, breakTime);
    const maxCount = mData.reduce((a, b) => {
      cityConfig.forEach((c) => {
        const compare = b[`${c.name}Line`];
        a = (compare && a <= compare) ? compare : a;
      });
      return a;
    }, 0);
    const { width: _width } = this.state;
    const ticks = [...scaleX1.ticks(10).map(t =>
      ({ t, x: (scaleX1(t) / this.rangeX[2]) * (_width - 20), seg: 1 }) // 图表数据宽度 ：px
    ), ...scaleX2.ticks(5).map(t =>
      ({ t, x: (scaleX2(t) / this.rangeX[2]) * (_width - 20), seg: 2 }) // 图表数据宽度 ：px
    )];
    const maxY = maxCount * 1.2;

    const scaleY = {
      min: 0,
      max: maxY,
      type: 'pow',
      base: 2,
      nice: false,
    };
    const scale = {
      x: {
        nice: false,
        min: this.rangeX[0],
        max: this.rangeX[2],
      },
      value: {
        nice: false,
        min: 0,
        max: maxY,
        type: 'pow',
        base: 2,
      },
    };

    cityConfig.forEach((c) => {
      scale[`${c.name}Value`] = scaleY;
      scale[`${c.name}Line`] = scaleY;
      scale[`${c.name}Area`] = scaleY;
      scale[`${c.name}Dash`] = scaleY;
      scale[`${c.name}Point`] = scaleY;
    });
    let chart;
    console.log(data);
    if (Object.keys(data).length < 1) {
      // chart = <div>数据缺失</div>;
    } else {
      chart = (<Chart scale={scale} width={width} data={mData} height={height || 500}>
        <Axis name="x" visible={false} />
        <Tooltip />
        <Axis
          name="value"
          grid={{
            lineStyle: {
              stroke: 'rgba(255,255,255,.2)',
            },
          }}
          label={{
            textStyle: {
              fontSize: 22,
              fontWeight: 200,
              fill: 'rgba(255,255,255,.7)',
            },
          }}
          line={{
            stroke: 'rgba(255,255,255,.2)',
            lineWidth: 2,
          }}
        />

        <Geom
          type="line"
          position={'x*value'}
          color={'rgba(0,0,0,0)'}
          shape="smooth"
          size={2}
        />

        {cityConfig.map((c) => {
          const coms = [
            <Axis key={`${c.name}AxisY`} name={`${c.name}Line`} visible={false} />,
            <Axis key={`AxisValue${c.name}`} name={`${c.name}Value`} visible={false} />,
            <Axis key={`AxisArea${c.name}`} name={`${c.name}Area`} visible={false} />,
            <Axis key={`AxisDash${c.name}`} name={`${c.name}Dash`} visible={false} />,
            <Axis key={`AxisPoint${c.name}`} name={`${c.name}Point`} visible={false} />,
            <Geom
              key={`${c.name}geomLine`}
              type="line"
              position={`x*${c.name}Line`}
              color={c.rgba(0.4)}
              shape="smooth"
              size={2}
            />,
            <Geom
              key={`${c.name}geomArea`}
              type="area"
              position={`x*${c.name}Area`}
              color={`l (270) 0:${c.rgba(0)} .5:${c.rgba(0.1)} 1:${c.rgba(0.5)}`}
              shape="smooth"
            />,
            <Geom
              key={`${c.name}geomDash`}
              type="line"
              position={`x*${c.name}Dash`}
              color={c.rgba(0.4)}
              shape="smooth"
              size={2}
              style={{ lineDash: [5, 5], size: 10 }}
            />,
            <Geom
              key={`${c.name}geomPoint`}
              type="point"
              position={`x*${c.name}Point`}
              color={c.rgba(0.6)}
              shape="circle"
              size={4}
            />,
          ];
          return [...coms];
        })}
        <Guide>
          {cityConfig.map((c) => {
            const guides = [];

            (errors1[c.name] || []).forEach((d, j) => {
              // console.log((d.x1 + d.x2)/2);
              const my = d.y2;
              // const my = maxCount * (1.2 - (j * (0.2 / errors1Count)));
              guides.push(<Guide.Region
                key={`${c.name}Region${j}`}
                type="region"
                top
                start={{ x: d.x1, [`${c.name}Dash`]: 0 }}
                end={{ x: d.x2, [`${c.name}Dash`]: my }}
                style={{ fill: c.rgba1, stroke: c.rgba(0.8), lineWidth: 1 }}
              />);
              guides.push(<Guide.Text
                key={`${c.name}Text${j}`}
                top
                type="text"
                position={{ x: (d.x1 + d.x2) / 2, [`${c.name}Dash`]: my }}
                offsetY={-10}
                style={{
                  fill: c.color,
                  fontSize: '20',
                  textAlign: 'center',
                }}
                content={d.seg[0].value}
              />);
            });
            const guides2 = (errors2[c.name] || []).map((d, j) => [<Guide.Html
              key={`${c.name}html${j}`}
              type="html"
              zIndex={9999}
              position={{ x: d.x1, [`${c.name}Line`]: d.y1 }}
              html={renderError2Tip(d.seg[0], c)}
              alignX="middle"
              alignY="bottom"
            />, <Guide.Line
              key={`${c.name}line${j}`}
              zIndex={9999}
              start={{ x: d.x1, [`${c.name}Line`]: 0 }}
              end={{ x: d.x1, [`${c.name}Line`]: d.y1 }}
              lineStyle={{
                stroke: c.color,
                lineWidth: 1,
                lineDash: [1000, 0, 0],
              }}
            />]);
            return [...guides, ...guides2];
          })}
        </Guide>
      </Chart>);
    }
    return (
      <div className="chart-wrapper">
        <div className="legend">
          <ul>
            {cityConfig.map((d, i) => <li key={i}><span className="color" style={{ background: d.color }} />{d.city}</li>)}
          </ul>
        </div>
        <div className="chart-canvas">
          {chart}
        </div>
        {/* hack Axis */}
        <div className="axis">
          <div className="line" />
          {ticks.map((t, n) => (<div key={n} className="tick" style={{ left: t.x }}>
            <div className="tickLine" />
            <div className="text" style={{ color: t.seg === 1 ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,1)' }}>{Tools.timeFormat(t.t, 'hh:mm')}</div>
          </div>))}
        </div>
      </div>
    );
  }
}

export default LineChart;

import React from 'react';
import { Chart, Axis, Tooltip, Geom, Coord } from 'bizcharts';
import lineJson from '../../mock/line.json';
import circleJson from '../../mock/circle.json';
import './index.scss';

const ds1 = new window.DataSet();
const dv1 = ds1.createView().source(lineJson);
dv1.transform({
  type: 'fold',
  fields: ['Tokyo', 'London'], // 展开字段集
  key: 'city', // key字段
  value: 'temperature', // value字段
});

const cols = {
  month: {
    range: [0, 1],
  },
};

const dv2 = new window.DataSet.DataView();
dv2.source(circleJson).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
});
const cols2 = {
  percent: {
    formatter: (val) => {
      val = `${val * 100}%`;
      return val;
    },
  },
};

class Demo extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <img
            src="https://img.alicdn.com/tfs/TB18dJXxGmWBuNjy1XaXXXCbXXa-169-44.svg"
            alt=""
          />
          <div className="date-range">2018年6月5日 - 2018年6月12日</div>
        </div>
        <div className="split-bar">Overview</div>
        {/* data cube */}
        <div className="data-wrapper">
          <div className="data-item">
            <div className="item-title">
              <p className="title">Click Through Rate & Impressions</p>
              <p className="subtitle">by Clicks, CTR, and Impressions</p>
            </div>
            <div className="data-cubes">
              <div className="cube">
                <p>Clicks</p>
                <p>2,760.0</p>
                <p className="down">-67.4%</p>
              </div>
              <div className="cube">
                <p>CTR</p>
                <p>0.9%</p>
                <p className="down">-58.7%</p>
              </div>
              <div className="cube">
                <p>Impressions</p>
                <p>31.0万</p>
                <p className="down">-21.2%</p>
              </div>
            </div>
            <div className="chart-box">
              <Chart height={400} data={dv1} scale={cols} forceFit>
                <Axis name="month" />
                <Axis
                  name="temperature"
                  label={{ formatter: val => `${val}°C` }}
                />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={'city'}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={'circle'}
                  color={'city'}
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            </div>
          </div>
          <div className="data-item">
            <div className="item-title">
              <p className="title">Conversion Rate & Cost</p>
              <p className="subtitle">by Conversions Rate and Cost / Conv.</p>
            </div>
            <div className="data-cubes">
              <div className="cube">
                <p>Conversions</p>
                <p>359.0</p>
                <p className="down">-37.2%</p>
              </div>
              <div className="cube">
                <p>Conv. rate</p>
                <p>5.8%</p>
                <p className="down">-16.2%</p>
              </div>
              <div className="cube">
                <p>Cost / Conv.</p>
                <p>$4.54</p>
                <p className="down">64.3%</p>
              </div>
            </div>
            <div className="chart-box">
              <Chart height={400} data={dv1} scale={cols} forceFit>
                <Axis name="month" />
                <Axis
                  name="temperature"
                  label={{ formatter: val => `${val}°C` }}
                />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={'city'}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={'circle'}
                  color={'city'}
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            </div>
          </div>
          <div className="data-item">
            <div className="item-title">
              <p className="title">Cost Per Clic</p>
              <p className="subtitle">by Cost, CPC, and CPM</p>
            </div>
            <div className="data-cubes">
              <div className="cube">
                <p>Cost</p>
                <p>$1,252.00</p>
                <p className="up">20.8%</p>
              </div>
              <div className="cube">
                <p>20.8%</p>
                <p>$0.27</p>
                <p className="down">37.6%</p>
              </div>
              <div className="cube">
                <p>Avg. CPM</p>
                <p>$2.28</p>
                <p className="up">43.1%</p>
              </div>
            </div>
            <div className="chart-box">
              <Chart height={400} data={dv1} scale={cols} forceFit>
                <Axis name="month" />
                <Axis name="temperature" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={'city'}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={'circle'}
                  color={'city'}
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className="bottom-box">
          <div className="bottom-left-box">
            <p className="title">Top Campaigns</p>
            <p className="subtitle">by CTR, Avg. CPC, and Cost / Conv.</p>
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>CTR</th>
                  <th>Avg.CPC</th>
                  <th>Cost/Conv.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - Dynamic Search
                    Ads
                  </td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.88)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.06)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
                <tr>
                  <td>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - T-Shirts</td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.867)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.086)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
                <tr>
                  <td>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - Wearables</td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.74)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.14)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
                <tr>
                  <td>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - Biking</td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.68)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.31)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
                <tr>
                  <td>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - T-Shirts</td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.65)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.384)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
                <tr>
                  <td>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campaign - T-Shirts</td>
                  <td style={{ background: 'rgba(47, 86, 118, 0.275)' }}>
                    4.64%
                  </td>
                  <td style={{ background: 'rgba(76, 175, 80, 0.57)' }}>
                    $0.42
                  </td>
                  <td>$6.04</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bottom-right-box">
            <p className="title">Device Breakdown</p>
            <p className="subtitle">by Clicks, Cost, and Conversions</p>
            <div className="bottom-charts">
              <div className="circle-chart">
                <Chart height="200" width="200" data={dv2} scale={cols2} padding={[0, 0, 0, 0]}>
                  <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                  <Axis name="percent" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      'item*percent',
                      (item, percent) => {
                        percent = `${percent * 100}%`;
                        return {
                          name: item,
                          value: percent,
                        };
                      },
                    ]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                  />
                </Chart>
              </div>
              <div className="circle-chart">
                <Chart height="200" width="200" data={dv2} scale={cols2} padding={[0, 0, 0, 0]}>
                  <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                  <Axis name="percent" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      'item*percent',
                      (item, percent) => {
                        percent = `${percent * 100}%`;
                        return {
                          name: item,
                          value: percent,
                        };
                      },
                    ]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                  />
                </Chart>
              </div>
              <div className="circle-chart">
                <Chart height="200" width="200" data={dv2} scale={cols2} padding={[0, 0, 0, 0]}>
                  <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                  <Axis name="percent" />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      'item*percent',
                      (item, percent) => {
                        percent = `${percent * 100}%`;
                        return {
                          name: item,
                          value: percent,
                        };
                      },
                    ]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                  />
                </Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;

/**
 * data screen demo
 */

import React, { Component } from 'react';

import Data from '../../mock/upperData.json';
import Title from '../../components/title';
import General from '../../components/general';
import SubTitle from '../../components/subTitle';
// chart component
import LineChart from '../../components/charts/line';
import BarChart from '../../components/charts/bar';
import PieChart from '../../components/charts/pie';

import './index.scss';

const industry = {
  行业一: { lastOrder: 360000, lastVolumn: 70000000 },
  行业二: { lastOrder: 71000, lastVolumn: 460000000 },
  行业三: { lastOrder: 29000, lastVolumn: 1900000 },
  行业四: { lastOrder: 0, lastVolumn: 0 },
  其他: { lastOrder: 5000, lastVolumn: 3000000 },
};

export default class Upper extends Component {
  constructor(props) {
    super(props);

    this.state = this.process();
  }

  process() {
    const {
      volumnPriceTrend,
      volumnOrderTrend,
      businessVolumnPrice,
      businessVolumnOrder,
      proportion,
      updateTime,
      startTime,
    } = Data;
    const arr = ['行业一', '行业二', '行业三', '行业四', '其他'];

    const volumnArr = [];
    const orderArr = [];

    for (const attr of arr) {
      for (const item of businessVolumnPrice) {
        if (item.key === attr) {
          volumnArr.push(item || {});
          volumnArr[volumnArr.length - 1].last = industry[item.key].lastVolumn;
        }
      }
      for (const item of businessVolumnOrder) {
        if (item.key === attr) {
          orderArr.push(item || {});
          orderArr[orderArr.length - 1].last = industry[item.key].lastOrder;
        }
      }
    }

    return {
      upperLineTopData: volumnPriceTrend || [],
      upperLineBottomData: volumnOrderTrend || [],
      upperBarTopData: volumnArr || [],
      upperBarBottomData: orderArr || [],
      upperPieroseData: proportion || [],
      upperUpdateTime: updateTime,
      upperStartTime: startTime,
    };
  }

  render() {
    const { upperLineTopData, upperLineBottomData, upperBarTopData, upperBarBottomData, upperUpdateTime, upperStartTime, upperPieroseData } = this.state;
    const { innerHeight } = window;

    const lineChartHeight = (innerHeight - 550) / 2;
    const barChartHeight = (innerHeight - 100) / 2;

    return (
      <div className="upper-container" style={{ height: innerHeight }}>
        <Title text="XXXXXXXX实时数据" updateTime={upperUpdateTime} startTime={upperStartTime} />
        <div className="upper-wrapper">
          <div className="upper-left">
            <div className="trading-volumn-general">
              <div className="trading-volumn-general-seperator" />
              <div className="trading-volumn-general-text-container">
                <span className="trading-volumn-general-text">总成交概况</span>
              </div>
              <div className="trading-volumn-general-seperator" />
            </div>
            <div className="trading-volumn-detail">
              <div className="trading-volumn-detail-top">
                <General />
                <div className="trading-volumn-proportion">
                  <SubTitle text="各行业成交额占比" />
                  <PieChart data={upperPieroseData} />
                </div>
              </div>
              <div className="trading-volumn-detail-bottom">
                <div className="detail-bottom-line-chart">
                  <SubTitle text="总成交金额趋势图" />
                  <LineChart data={upperLineTopData} height={lineChartHeight} last={3000000000} lastThree={9000000000} double11={15000000000} />
                </div>
                <div className="detail-bottom-line-chart">
                  <SubTitle text="总成交订单趋势图" />
                  <LineChart data={upperLineBottomData} height={lineChartHeight} last={500000} lastThree={1300000} double11={1800000} type="order" />
                </div>
              </div>
            </div>
          </div>
          <div className="upper-right">
            <div className="top5-list">
              <div className="top5-list-title">
                <span>各行业成交金额</span>
              </div>
              <BarChart data={upperBarTopData} height={barChartHeight} hasComparison />
            </div>
            <div className="top5-list">
              <div className="top5-list-title">
                <span>各行业成交订单数</span>
              </div>
              <BarChart data={upperBarBottomData} height={barChartHeight} type="yellow" hasComparison />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

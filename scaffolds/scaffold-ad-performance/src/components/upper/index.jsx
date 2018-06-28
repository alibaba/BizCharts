import React, { Component } from 'react';

import Title from '../title';
import SubTitle from '../subTitle';
import SegmentLine from '../segmentLine';

import Bar from '../../components/charts/bar';
import GroupedBar from '../../components/charts/groupedBar';
import Pie from '../../components/charts/pie';
import NormalBar from '../../components/charts/NormalBar';
import TableChart from '../../components/table';

import './index.scss';

const seeData = [
  { company: '耐克', recall: 0.344 },
  { company: '可口可乐', recall: 0.326 },
  { company: '汰渍', recall: 0.225 },
  { company: '麦当劳', recall: 0.213 },
  { company: '三星', recall: 0.213 },
];

const seePieData = [
  { type: '记得', value: 0.37 },
  { type: '不记得', value: 0.63 },
];

const thinkData = [
  { type: '非赞助商', feelV: 2.85, feel: '未曝光' },
  { type: '非赞助商', feelV: 3.5, feel: '曝光' },
  { type: '赞助商', feelV: 2.74, feel: '未曝光' },
  { type: '赞助商', feelV: 3.45, feel: '曝光' },
];

const thinkData2 = [
  { type: '非赞助商', feelV: 2.25, feel: '没有影响' },
  { type: '非赞助商', feelV: 2.93, feel: '有影响' },
  { type: '赞助商', feelV: 2.44, feel: '没有影响' },
  { type: '赞助商', feelV: 3.04, feel: '有影响' },
];

const doData2 = [
  { type: '情感', value: 1.57 },
  { type: '产品', value: 1.56 },
  { type: '激情', value: 1.03 },
  { type: '品牌', value: 0.24 },
  { type: '有趣', value: 0.08 },
];

const doData3 = [
  { type: '非赞助商', value: 1.11 },
  { type: '赞助商', value: 0.94 },
];

export default class Upper extends Component {
  render() {
    return (
      <div className="upper-container">
        <Title />
        <div>
          <div className="charts-container">
            <div className="chart-panel">
              <div>
                <SubTitle text="看" bgColor="#00c9b4" imageSrc="https://img.alicdn.com/tfs/TB1yyzFxeuSBuNjy1XcXXcYjFXa-256-256.png" />
                <Bar data={seeData} showPercent xPos="company" yPos="recall" color="#01c0a5" text="他们是否记得看过这些广告?" />
                <SegmentLine />
                <Pie data={seePieData} color={['type', ['#72e5d8', '#01c0a1']]} text="他们记得广告中的产品和服务吗?" />
              </div>
            </div>
            <div className="chart-panel">
              <div>
                <SubTitle text="想" bgColor="rgb(0, 191, 255)" imageSrc="https://img.alicdn.com/tfs/TB1wMkWxamWBuNjy1XaXXXCbXXa-256-256.png" />
                <GroupedBar
                  data={thinkData}
                  xPos="type"
                  yPos="feelV"
                  color={['feel', ['#02beff', '#db4437']]}
                  text="广告是否改变了他们对品牌的看法？"
                  barDes="1.0 = 更消极&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.0 = 更积极"
                />
                <SegmentLine />
                <GroupedBar
                  data={thinkData2}
                  xPos="type"
                  yPos="feelV"
                  color={['feel', ['rgb(183, 28, 29)', 'rgb(219, 68, 55)']]}
                  text="广告是否对购买意图有影响?"
                  barDes="1.0 = 可能性小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.0 = 可能性大"
                />
              </div>
            </div>
            <div className="chart-panel">
              <div>
                <SubTitle text="做" bgColor="#7c54c4" imageSrc="https://img.alicdn.com/tfs/TB1Xq7dxhGYBuNjy0FnXXX5lpXa-256-256.png" />
                <TableChart text="哪些广告带来最大的回应？" />
                <SegmentLine />
                <Bar data={doData2} xPos="type" yPos="value" color="#893bb7" text="什么类型的广告带来最大效应?" height={200} />
                <SegmentLine />
                <NormalBar
                  data={doData3}
                  xPos="type"
                  yPos="value"
                  color="#893bb7"
                  text="人们是否会对赞助商广告做出更多回应？"
                />
              </div>
            </div>
          </div>
          {/* <div className="charts-des">
          数据来源:Google Data Studio
          </div> */}
        </div>
      </div>
    );
  }
}

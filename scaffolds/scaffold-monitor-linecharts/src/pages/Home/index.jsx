import React from 'react';
import LineChart from '../../components/LineChart';
import Warnings from '../../components/Warnings';
import Header from '../../components/Header';
import mockData from '../../mock/lineChart/data.json';
import mockDataWarning from '../../mock/warning/data.json';
import { cityConfig } from '../../config/cityConfig';
import './index.scss';


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.box = [];
  }

  state = {
    warningData: [], // 初始值
    counts: [],
    show: [0, 1, 2, 3], // 最开始展示块的index
  }

  componentDidMount() {
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 30000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    this.timer2 && clearInterval(this.timer2);
  }

  getData() {
    // 请求曲线图的数据接口
    // getCounts('tcp_ping_failure').then((res) => {
    this.setState({
      counts: mockData.data || [],
      shouldAlarm: mockData.shouldAlarm || true, // 是否开启预警灯光 undefinde/false/true
    });
    // });

    // 请求警示信息的数据接口 ------- 全部刷新式更新轮播
    // getWarning('tcp_ping_failure').then((mockDataWarning) => {
    const { data } = mockDataWarning;
    // 创建id
    /* eslint-disable no-param-reassign */
    data.forEach((d, i) => (d.id = `${i}${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`));
    /* eslint-enable */
    this.setState({
      warningData: data || [],
      show: data.length <= 4 ? data.map((d, i) => i) : [0, 1, 2, 3],
    });
    this.timer2 && clearInterval(this.timer2);
    if (data.length > 4) {
      this.timer2 = setInterval(() => {
        this.nextAction();
      }, 5000);
    }
    // });
  }

  nextAction() {
    this.setState({
      show: this.state.show.map(i => ((i + 1) >= this.state.warningData.length ? 0 : (i + 1))),
    });
  }

  render() {
    const { warningData, counts, show, shouldAlarm } = this.state;
    const box = [];
    show.forEach((w) => {
      const war = warningData.find((n, i) => (w === i));
      if (war) {
        box.unshift(war);
      }
    });
    this.box = box;
    return (
      <div className="body-bg-star">
        {/* 标题 */}
        <Header />
        {/* 曲线图 */}
        <LineChart data={counts} cityConfig={cityConfig} />
        {/* 警示信息 */}
        <Warnings data={box} cityConfig={cityConfig} />
        {/* 预警灯光 */}
        <div>
          {shouldAlarm ? <div className="warning-light">
            <div className="scene-light1" />
            <div className="scene-light2" />
            <div className="scene-light3" />
          </div> : null}
        </div>
      </div>
    );
  }
}

export default Demo;

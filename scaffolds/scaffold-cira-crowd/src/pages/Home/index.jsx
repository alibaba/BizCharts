import React from 'react';

import ChartContainer from '../../components/chart-container';
import Tab from '../../components/tab';

import CONST from '../../utils/constants';
import './index.scss';

const { TABS } = CONST;

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
    };
  }

  changeTab = (key) => {
    this.setState({
      currentTab: parseInt(key, 10),
    });
  }

  render() {
    const { currentTab } = this.state;

    return (
      <div className="page-wrapper">
        <Tab data={TABS} selected={currentTab} changeTab={this.changeTab} />
        <div className="tab-pane">
          {
            CONST[`PANEL${currentTab}`].map((item, index) => (
              <ChartContainer
                title={item.title}
                key={`${currentTab}-${index}`}
                style={{ width: item.oneline ? '100%' : '49%' }}
                item={item}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Demo;

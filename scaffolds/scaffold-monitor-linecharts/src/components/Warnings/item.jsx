import React from 'react';
import propTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

import './index.scss';

const duration = 500;

const getLeft = i => (i) * (455 + 21) || 0;

class Item extends React.Component {
  static propTypes = {
    cityConfig: propTypes.array,
    data: propTypes.any,
    index: propTypes.number,
  }

  render() {
    const { data, index, cityConfig } = this.props;
    const transitionStyles = {
      entering: { opacity: 0, left: getLeft(index - 1) },
      entered: { opacity: 1, left: getLeft(index) },
    };
    const city = cityConfig.find(c => c.city === data.city) || { city: '无', color: '#efefef' };
    return (<Transition appear in timeout={duration}>
      {state => (<div
        className="com-warning-box"
        style={Object.assign({
          transition: `all ${duration}ms ease-in-out`,
          opacity: 0,
        }, transitionStyles[state])}
      >
        <div className="city"><div className="ver" style={{ color: city.color }}>{city.city}</div></div>
        <div className="right">
          <div className="title"><span className="time">{data.when}</span>网络不通</div>
          <ul className="message">
            <li>
              <div className="name">持续：</div>
              <span className="value">
                {data.timespanH ? <span className="impot">{data.timespanH}</span> : null}
                {data.timespanH ? '时' : null}
                <span className="impot">{data.timespanM}</span>
                  分
                <span className="impot">{data.timespanS}</span>
                  秒
              </span>
            </li>
            <li>
              <span className="name">对象：</span>
              <div className="value small" style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                <div style={{ width: '190px' }}>{data.obj}</div>
              </div>
            </li>
            <li>
              <span className="name">异常数：</span>
              <span className="value">{data.errorCount} / {data.totalCount}</span>
            </li>
          </ul>
        </div>
      </div>)}
    </Transition>);
  }
}

export default Item;


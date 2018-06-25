import React, { Component } from 'react';

import './index.scss';

export default class Tab extends Component {
  render() {
    const { data, selected } = this.props;

    return (
      <div className="tabs">
        {
          data.map((item, index) => (
            <div
              key={index}
              className={index === selected ? 'tab selected' : 'tab'}
              onClick={
                  () => {
                    this.props.changeTab && this.props.changeTab(index);
                  }
                }
            >
              {item}
              { index === selected && <div className="underline" /> }
            </div>
          ))
        }
      </div>
    );
  }
}

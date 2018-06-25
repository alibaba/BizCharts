import React from 'react';
import propTypes from 'prop-types';
import Item from './item';

export default class Warnings extends React.Component {
  static propTypes = {
    cityConfig: propTypes.array,
    data: propTypes.any,
  }

  static defaultProps = {
    cityConfig: [],
    data: {},
  }

  render() {
    const { data, cityConfig } = this.props;

    return (<div >
      <div className="warnings">
        {
          data.map((w, i) => <Item action={data.length > 4} cityConfig={cityConfig} index={i} key={w.id} data={w} />)
        }
        {
          (data.length === 0) ? <img className="no-warning" src="https://img.alicdn.com/tfs/TB1kMPCbvDH8KJjy1XcXXcpdXXa-94-116.png" /> : undefined
        }
      </div>
    </div>);
  }
}

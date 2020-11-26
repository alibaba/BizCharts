import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';

import AreaChart from '../../src/plots/AreaChart';

storiesOf('box', module).add('面积图', () => {
  const [ data, setData ] = useState([]);
  const option = {
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
  }
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
  });
  }, [])
  return <AreaChart data={data} {...option} />
});


import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { text, withKnobs, boolean, number, object, select } from '@storybook/addon-knobs';

import Interval from '../demos/geom/interval';

withInfo({ info: '' });

const dataSource = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
  { year: '1959 年', value: 38 },
  { year: '1960 年', value: 38 },
  { year: '1962 年', value: 38 },
];

const dataSource2 = [
  { year: '1951 年', value: 18 },
  { year: '1952 年', value: 252 },
  { year: '1956 年', value: 21 },
  { year: '1957 年', value: 45 },
  { year: '1958 年', value: 148 },
  { year: '1959 年', value: 38 },
  { year: '1960 年', value: 38 },
  { year: '1962 年', value: 38 },
];

const getData = () => {
  const count = Math.random();
  if (count < 0.3) {
    return dataSource2;
  }
  if (count < 0.7) {
    return dataSource;
  }

  return dataSource;
}

function ChangeData() {
  const [data, setData] = useState(dataSource);
  return <>
    <div onClick={() => setData(getData())}>click me</div>
    <Interval
      Chart={{
        data,
        onClick: console.log,
        onAfterrender: () => console.log('onAfterrender'),
        onAfterpaint: () => console.log('onAfterpaint'),
        }} 
      Interval={{ 'element-highlight': boolean('element-highlight', true)} }
    />
  </>
}

const stories = storiesOf('Update', module);
stories.add('change data', ChangeData);

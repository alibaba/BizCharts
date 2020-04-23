import React from 'react';
import { storiesOf } from '@storybook/react';

import gradientPolyline from '../demos/line/gradientPolyline';
import ordinaryCurve from '../demos/line/ordinaryCurve';
import ordinaryPolyline from '../demos/line/ordinaryPolyline';
import stepPolyline from '../demos/line/stepPolyline';

storiesOf('line', module).add('渐变色折线图', gradientPolyline);
storiesOf('line', module).add('普通曲线图', ordinaryCurve);
storiesOf('line', module).add('普通折线图', ordinaryPolyline);
storiesOf('line', module).add('阶梯折线图', stepPolyline);
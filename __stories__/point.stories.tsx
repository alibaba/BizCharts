import React from 'react';
import { storiesOf } from '@storybook/react';

import basicPoint from '../demos/point/basicPoint'
import bubble from '../demos/point/bubble'
import multiShapeScatter from '../demos/point/multiShapeScatter'

storiesOf('point', module).add('基础散点图', basicPoint);
storiesOf('point', module).add('气泡图', bubble);
storiesOf('point', module).add('多形状散点图', multiShapeScatter);
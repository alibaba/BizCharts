import React from 'react';
import { storiesOf } from '@storybook/react';

import Line from '../demos/geom/line';
import Interval from '../demos/geom/interval';
import IntervalGroup from '../demos/geom/interval-group';
import LineAdvance from '../demos/geom/LineAdvance';

storiesOf('geometry', module).add('line', Line);
storiesOf('geometry', module).add('Interval', Interval);
storiesOf('geometry', module).add('Interval-group', IntervalGroup);
storiesOf('geometry', module).add('LineAdvance', LineAdvance);

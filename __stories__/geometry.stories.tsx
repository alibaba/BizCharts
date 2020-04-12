import React from 'react';
import { storiesOf } from '@storybook/react';

import Line from '../demos/geom/line';
import Interval from '../demos/geom/interval';

storiesOf('geometry', module).add('line', () => <Line />);
storiesOf('geometry', module).add('Interval', () => <Interval />);

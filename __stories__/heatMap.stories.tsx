import React from 'react';
import { storiesOf } from '@storybook/react';

import calendar from '../demos/heatMap/calendar';
import heatMap from '../demos/heatMap/heatMap';

storiesOf('heatMap', module).add('热力图', heatMap);
storiesOf('heatMap', module).add('日历热力图', calendar);

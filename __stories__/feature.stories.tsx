import React from 'react';
import { storiesOf } from '@storybook/react';

import Pure from '../demos/features/pure';
import Transform from '../demos/features/transform';
import Effects from '../demos/features/effects';
import Resize from '../demos/features/resize';
import ChangeData from '../demos/features/changeData';
import Slider from '../demos/features/slider';
import Selected from '../demos/features/selected';
import ChartManager from '../demos/features/chartManager';

storiesOf('features', module).add('Pure', Pure);
storiesOf('features', module).add('transform', Transform);
storiesOf('features', module).add('effects', Effects);
storiesOf('features', module).add('resize', Resize);
storiesOf('features', module).add('changeData', ChangeData);
storiesOf('features', module).add('slider', Slider);
storiesOf('features', module).add('selected', Selected);
storiesOf('features', module).add('chartManager', ChartManager);

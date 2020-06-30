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
import Filter from '../demos/features/filter';

storiesOf('features', module)
  .add('Pure', Pure)
  .add('transform', Transform)
  .add('effects', Effects)
  .add('resize', Resize)
  .add('changeData', ChangeData)
  .add('slider', Slider)
  .add('selected', Selected)
  .add('chartManager', ChartManager)
  .add('filter', Filter);

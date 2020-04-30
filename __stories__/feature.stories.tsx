import React from 'react';
import { storiesOf } from '@storybook/react';

import Pure from '../demos/features/pure';
import Transform from '../demos/features/transform';
import Effects from '../demos/features/effects';
import Resize from '../demos/features/resize';
import ChangeData from '../demos/features/changeData';

storiesOf('features', module).add('Pure', () => <Pure />);
storiesOf('features', module).add('transform', Transform);
storiesOf('features', module).add('effects', Effects);
storiesOf('features', module).add('resize', Resize);
storiesOf('features', module).add('changeData', ChangeData);

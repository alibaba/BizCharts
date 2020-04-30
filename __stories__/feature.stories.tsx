import React from 'react';
import { storiesOf } from '@storybook/react';

import Pure from '../demos/features/pure';
import Transform from '../demos/features/transform';
import Effects from '../demos/features/effects';
import Resize from '../demos/features/resize';

storiesOf('features', module).add('Pure', () => <Pure />);
storiesOf('features', module).add('transform', Transform);
storiesOf('features', module).add('effects', Effects);
storiesOf('features', module).add('resize', Resize);

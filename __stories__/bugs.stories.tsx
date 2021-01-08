import React from 'react';
import { storiesOf } from '@storybook/react';

import ViewChange from '../demos/bugs/view-changeData';
import Columntree from '../demos/features/facet';

storiesOf('bugs', module)
  .add('Columntree', () => <Columntree />)
  .add('ViewChange', () => <ViewChange />);

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import AutoFit from '../demos/components/autoFit';
import Coordinate from '../demos/components/coordinate';
import View from '../demos/components/view';
import Annotation from '../demos/components/annotation';

withInfo({ info: '' });

const stories = storiesOf('基础组件', module);
stories.add('Chart autoFit', AutoFit);
stories.add('Coordinate', Coordinate);
stories.add('annotation', Annotation);
stories.add('View', View);


import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ThemedChart from '../demos/theme';
withInfo({ info: '' });

const stories = storiesOf('Theme', module);
stories.add('Chart Theme', ThemedChart);

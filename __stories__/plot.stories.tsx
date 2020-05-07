import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { text, withKnobs, boolean, number, object, select } from '@storybook/addon-knobs';

import Line from '../demos/plot/line';
import Ring from '../demos/plot/ring';

withInfo({ info: '' });

const stories = storiesOf('usePlot', module);
stories.add('line',() => <Line title={{
  text: text('title.text', '折线图'),
  visible: boolean('title', true),
}} />);

stories.add('ring', Ring);

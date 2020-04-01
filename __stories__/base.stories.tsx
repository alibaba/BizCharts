import React from 'react';
import { storiesOf } from '@storybook/react';
import Chart from '../src/components/Chart';

storiesOf('基础组件', module).add('Chart', () => <Chart height={500} />);

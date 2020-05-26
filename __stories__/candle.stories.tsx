import React from 'react';
import { storiesOf } from '@storybook/react';

import stock from '../demos/candle/stock'

storiesOf('candle', module).add('股票图于柱状图', stock);

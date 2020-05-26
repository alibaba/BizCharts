import React from 'react';
import { storiesOf } from '@storybook/react';

import RoseChartLimitedAngleRange from '../demos/pie/RoseChart-limitedAngleRange'
import basicPie from '../demos/pie/basicPie'
import multicolorNightingaleRoseillustration from '../demos/pie/multicolorNightingaleRoseillustration'
import nestedPie from '../demos/pie/nestedPie'
import nightingaleRoseIllustration from '../demos/pie/nightingaleRoseIllustration'
import nightingaleRosette from '../demos/pie/nightingaleRosette'
import visualizationOfDailyWork from '../demos/pie/visualizationOfDailyWork'

storiesOf('pie', module).add('玫瑰图-限定角度范围', RoseChartLimitedAngleRange);
storiesOf('pie', module).add('基础饼图', basicPie);
storiesOf('pie', module).add('多色南丁格尔玫瑰图', multicolorNightingaleRoseillustration);
storiesOf('pie', module).add('嵌套饼图', nestedPie);
storiesOf('pie', module).add('南丁格尔玫瑰环图', nightingaleRoseIllustration);
storiesOf('pie', module).add('南丁格尔玫瑰图', nightingaleRosette);
storiesOf('pie', module).add('日常作息可视化', visualizationOfDailyWork);

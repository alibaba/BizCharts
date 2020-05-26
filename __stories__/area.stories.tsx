import React from 'react';
import { storiesOf } from '@storybook/react';

import areaWithNull from '../demos/area/areaWithNull';
import basicArea from '../demos/area/basicArea';
import basicAreaWithNegativeValues from '../demos/area/basicAreaWithNegativeValues';
import colorBlock from '../demos/area/colorBlock';
import intervalArea from '../demos/area/intervalArea';
import percentStackingArea from '../demos/area/percentStackingArea';
import stackingArea from '../demos/area/stackingArea';

storiesOf('area', module).add('存在空值的面积图', areaWithNull);
storiesOf('area', module).add('基础面积图', basicArea);
storiesOf('area', module).add('有负值的基础面积图', basicAreaWithNegativeValues);
storiesOf('area', module).add('色块图', colorBlock);
storiesOf('area', module).add('区间面积图', intervalArea);
storiesOf('area', module).add('百分比堆叠面积图', percentStackingArea);
storiesOf('area', module).add('堆叠面积图', stackingArea);

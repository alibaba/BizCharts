import React from 'react';
import { storiesOf } from '@storybook/react';

import basicBar from '../demos/interval/basicBar';
import basicColumn from '../demos/interval/basicColumn';
import colorGroupedStackedColumns from '../demos/interval/colorGroupedStackedColumns';
import comparedBar from '../demos/interval/comparedBar';
import gradientBar from '../demos/interval/gradientBar';
import groupedBar from '../demos/interval/groupedBar';
import groupedColumns from '../demos/interval/groupedColumns';
import groupedStackedColumns from '../demos/interval/groupedStackedColumns';
import histogram from '../demos/interval/histogram';
import intervalColumn from '../demos/interval/intervalColumn';
import percentStackedColumn from '../demos/interval/percentStackedColumn';
import polarCoordinate from '../demos/interval/polarCoordinate';
import roundedColumn from '../demos/interval/roundedColumn';
import stackedBars from '../demos/interval/stackedBars';
import stackedColumn from '../demos/interval/stackedColumn';

import bezierInterval from '../demos/interval/bezier';

storiesOf('interval', module).add('基础条形图', basicBar);
storiesOf('interval', module).add('基础柱状图', basicColumn);
storiesOf('interval', module).add('color映射多字段,分组堆叠柱状图', colorGroupedStackedColumns);
storiesOf('interval', module).add('diverging 正负对比图', comparedBar);
storiesOf('interval', module).add('渐变条形图带label', gradientBar);
storiesOf('interval', module).add('分组条形图', groupedBar);
storiesOf('interval', module).add('分组柱状图', groupedColumns);
storiesOf('interval', module).add('分组堆叠柱状图', groupedStackedColumns);
storiesOf('interval', module).add('直方图', histogram);
storiesOf('interval', module).add('区间柱状图', intervalColumn);
storiesOf('interval', module).add('百分比堆叠柱状图', percentStackedColumn);
storiesOf('interval', module).add('极坐标分组柱状图', polarCoordinate);
storiesOf('interval', module).add('圆角柱状图', roundedColumn);
storiesOf('interval', module).add('堆叠条形图', stackedBars);
storiesOf('interval', module).add('堆叠柱状图', stackedColumn);
storiesOf('interval', module).add('贝塞尔柱状图', bezierInterval);

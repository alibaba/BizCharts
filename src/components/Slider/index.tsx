
import 'react';
import _Slider from '@antv/g2/lib/chart/controller/slider';
import { registerComponentController } from '@antv/g2/lib/core';
// 引入 slider 组件
registerComponentController('slider', _Slider);

import useChartView from '../../hooks/useChartView';

interface TrendCfg {
  // 数据
  data: number[];
  // 样式
  smooth?: boolean;
  isArea?: boolean;
  backgroundStyle?: object;
  lineStyle?: object;
  areaStyle?: object;
}

export interface ISliderProps {
  // 缩略轴高度
  height?: number;

  // 背景趋势的配置
  trendCfg?: TrendCfg;
  backgroundStyle?: any;
  foregroundStyle?: any;
  handlerStyle?: any;
  textStyle?: any;
  // 允许滑动位置
  minLimit?: number;
  maxLimit?: number;
  // 初始位置
  start?: number;
  end?: number;
}

function Slider(props: ISliderProps) {
  const view = useChartView();
  view.option('slider', props);
  return null;
}

export default Slider

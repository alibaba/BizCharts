

// 注册 G 渲染引擎
import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { registerEngine } from '@antv/g2/lib/core';
// 动画
import './animations';
// 主题
export * from './theme';

registerEngine('canvas', CanvasEngine);
registerEngine('svg', SVGEngine);

export * from '@antv/g2/lib/core';
export const VERSION = '4.0.10';

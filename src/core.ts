export const VERSION = '4.0.0';

export * from '@antv/g2/esm/core';

// 注册 G 渲染引擎
import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { registerEngine } from '@antv/g2/esm/core';

registerEngine('canvas', CanvasEngine);
registerEngine('svg', SVGEngine);

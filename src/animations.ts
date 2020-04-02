
// 注册需要的动画执行函数
import { fadeIn, fadeOut } from '@antv/g2/esm/animate/animation/fade';
import { growInX, growInXY, growInY } from '@antv/g2/esm/animate/animation/grow-in';
import { pathIn } from '@antv/g2/esm/animate/animation/path-in';
import { positionUpdate } from '@antv/g2/esm/animate/animation/position-update';
import { scaleInX, scaleInY } from '@antv/g2/esm/animate/animation/scale-in';
import { sectorPathUpdate } from '@antv/g2/esm/animate/animation/sector-path-update';
import { waveIn } from '@antv/g2/esm/animate/animation/wave-in';
import { zoomIn, zoomOut } from '@antv/g2/esm/animate/animation/zoom';
import { registerAnimation } from '@antv/g2/esm/core';

registerAnimation('fade-in', fadeIn);
registerAnimation('fade-out', fadeOut);
registerAnimation('grow-in-x', growInX);
registerAnimation('grow-in-xy', growInXY);
registerAnimation('grow-in-y', growInY);
registerAnimation('scale-in-x', scaleInX);
registerAnimation('scale-in-y', scaleInY);
registerAnimation('wave-in', waveIn);
registerAnimation('zoom-in', zoomIn);
registerAnimation('zoom-out', zoomOut);
registerAnimation('position-update', positionUpdate);
registerAnimation('sector-path-update', sectorPathUpdate);
registerAnimation('path-in', pathIn);

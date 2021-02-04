import React from 'react';
import forIn from '@antv/util/lib/for-in';
import isFunction from '@antv/util/lib/is-function';
import pickWithout from '../../utils/pickWithout';
import { REACT_PIVATE_PROPS } from '../../utils/constant';
import cloneDeep from '../../utils/cloneDeep';

import { EVENTS } from './events';

export interface IBaseProps extends React.Props<any> {
  animate?: {
    /**
     * 目标样式
     * @type {Record<string, any>}
     */
    toAttrs: Record<string, any>;
    /**
     * 动画执行时间
     * @type {number}
     */
    duration: number;
    /**
     * 动画缓动效果
     * @type {string}}
     */
    easing?: string;
    /**
     * 动画执行的延迟时间
     * @type {function}}
     */
    delay?: number;
    /**
     * 是否重复执行动画
     * @type {boolean}}
     */
    repeat?: boolean;
    /**
     * 动画执行完时的回调函数
     * @type {function}}
     */
    callback?: () => void;
    /**
     * 动画暂停时的回调函数
     * @type {function}}
     */
    pauseCallback?: () => void;
    /**
     * 动画恢复(重新唤醒)时的回调函数
     * @type {function}}
     */
    resumeCallback?: () => void;
  };
  visible?: boolean;
  isClipShape?: boolean;
  matrix?: number[];
  [key: string]: any;
}

export default class Helper {
  instance: any;
  config: Record<string,any>;
  private shape: string;
  constructor(shape) {
    this.shape = shape;
  }
  createInstance(props) {
    this.instance = props.group.addShape(this.shape,pickWithout(props, ['group', 'ctx']))
  };
  destroy() {
    if (this.instance) {
      this.instance.remove(true);
      this.instance = null;
    }
  }
  update(props) {
    const newConfig = pickWithout(props, [...REACT_PIVATE_PROPS]);
    this.destroy();
    this.createInstance(newConfig);
    const { attrs, animate, isClipShape, visible, matrix, ...others } = newConfig;

    this.instance.attr(attrs);
    if (animate) {
      const { toAttrs, ...animateCfg } = animate;
      this.instance.animate(toAttrs, animateCfg);
    }
    if (isClipShape) {
      this.instance.isClipShape();
    }
    if (visible === false) {
      this.instance.hide();
    }

    if (matrix) {
      this.instance.setMatrix(matrix);
    }

    forIn(EVENTS, (v, k) => {
      if (isFunction(others[k])) {
        this.instance.on(v, others[k]);
      }
    });

    this.config = cloneDeep(newConfig);

  }
}

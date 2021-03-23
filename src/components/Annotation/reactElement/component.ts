import { getOuterHeight, getOuterWidth, modifyCSS } from '@antv/dom-util';
import HtmlAnnotation from '@antv/component/lib/annotation/html';
import { HtmlComponentCfg } from '@antv/component/lib/types';
import { clearDom } from '@antv/component/lib/util/util';
import ReactDom from 'react-dom';
import React from 'react';
import {isElement, isEqual, isFunction, isString} from '@antv/util';
import { createDom } from '@antv/g2/lib/util/dom';

/**
 * Html Annotation 组件配置
 */
export interface ReactElementAnnotationCfg extends HtmlComponentCfg {
  /** X 方向对齐，默认 left */
  alignX?: 'left' | 'middle' | 'right';
  /** Y 方向对齐，默认 top */
  alignY?: 'top' | 'middle' | 'bottom';
  /** 自定义 html */
  content: React.ReactElement | ((container?: HTMLElement) => React.ReactElement);
  /** zIndex 设置 */
  zIndex?: number;
}

// todo: @antv/component 支持register

HtmlAnnotation.prototype.render = function() {
    if (this.get('isReactElement')) {
      const container = this.getContainer();
      const content = this.get('content');
      const refreshDeps = this.get('refreshDeps');
      const rst: React.ReactElement = React.isValidElement(content) ? content : content(container);

      if (this.preRefreshDeps === undefined || !isEqual(this.preRefreshDeps, refreshDeps)) {
        ReactDom.render(rst, container);
        this.preRefreshDeps = refreshDeps;
      }
    } else {
      const container = this.getContainer();
      const html = this.get('html');
      clearDom(container);
      const rst: HTMLElement | string = isFunction(html) ? html(container) : html;
      if (isElement(rst)) {
        container.appendChild(rst as HTMLElement);
      } else if (isString(rst)) {
        container.appendChild(createDom(rst as string));
      }
    }
    this.resetPosition();
}


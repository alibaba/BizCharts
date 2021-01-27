import React from 'react';
import ReactDom from 'react-dom';

import _get from '@antv/util/lib/get';
import _modifyCss from '@antv/dom-util/lib/modify-css';
import { withView } from '../../context/view';
import { getTheme } from '../../core';


const CONTAINER_CLASS: string = 'g2-tooltip';

export interface TooltipProps extends React.ComponentProps<any> {
  children?: (title?: string, items?: any[], x?: number, y?: number, event?: any) => any,
  [key: string]: any;
}

class Tooltip extends React.Component<TooltipProps> {
  // HTMLElement
  protected element: HTMLElement ;

  componentWillUnmount() {
    const { chartView } = this.props;
    if (this.element) {
      this.element.remove();
    }
    chartView.getController('tooltip').clear();
    chartView.off('tooltip:change', this.renderInnder);
  }

  private getElement() {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add('bizcharts-tooltip');
      this.element.classList.add('g2-tooltip');
      this.element.style.width = 'auto';
      this.element.style.height = 'auto';
    }
    return this.element;
  }

  renderInnder = (e) => {
    const { title, items, x, y } = e.data;
    // 当数据变化的时候渲染, todo: 新建fiber根节点，和react虚拟dom的性能对比报告
    ReactDom.render(this.props.children(title, items, x, y, e), this.getElement());
  }

  overwriteCfg() {
    const { chartView, children, domStyles = {}, ...config } = this.props;
    chartView.tooltip({
      inPlot: false,
      domStyles,
      ...config,
      // 坐标移动即渲染
      customContent: () => this.getElement()
    });

    chartView.on('tooltip:change', this.renderInnder);

    // fixme: 主题要去图表主题，要meger domStyle。
    const domStylesTheme: object = _get(getTheme(), ['components', 'tooltip', 'domStyles', CONTAINER_CLASS], {});
    _modifyCss(this.element, {...domStylesTheme, ...domStyles[CONTAINER_CLASS]});

  }

  render() {
    this.overwriteCfg();
    return null; // 无子组件
  }
}

export default withView<TooltipProps>(Tooltip);

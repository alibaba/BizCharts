import React, { RefObject } from 'react';
import ReactDom from 'react-dom';
import _set from '@antv/util/lib/set';
import _clone from '@antv/util/lib/clone';
import _get from '@antv/util/lib/get';
import _modifyCss from '@antv/dom-util/lib/modify-css';
import withContainer from '@/boundary/withContainer';
import { withChartInstance } from '@/hooks/useRootChartInstance';
import { getTheme } from '@/core';

import InnerContent from './inner';


const CONTAINER_CLASS: string = 'g2-tooltip';

export interface TooltipProps extends React.ComponentProps<any> {
  children: (title?: string, items?: any[], styles?: {
    // 不要抽出去成interface，为了编辑器提示效果
    'g2-tooltip': React.StyleHTMLAttributes<HTMLDivElement>,
    'g2-tooltip-title': React.StyleHTMLAttributes<HTMLDivElement>,
    'g2-tooltip-list': React.StyleHTMLAttributes<HTMLDivElement>,
    'g2-tooltip-marker': React.StyleHTMLAttributes<HTMLDivElement>,
    'g2-tooltip-value': React.StyleHTMLAttributes<HTMLDivElement>,
    'g2-tooltip-list-item': React.StyleHTMLAttributes<HTMLDivElement>
  } ) => {},
  [key: string]: any;
}

class Tooltip extends React.Component<TooltipProps> {
  // HTMLElement
  protected element: HTMLElement ;

  private innerContent: RefObject<InnerContent> = React.createRef();

  constructor(props, context) {
    super(props, context);
    this.element = props.container;
    this.element.classList.add('bizcharts-tooltip');
    this.element.style.width = 'auto';
    this.element.style.height = 'auto';

  }

  refreshContent = ({title, items, x, y}) => {

    this.innerContent.current.refresh(this.props.children(title, items));
  }
  overwriteCfg() {
    const { chart, ...config } = this.props;
    chart.on('tooltip:change', this.refreshContent);
    chart.tooltip({
      inPlot: false,
      ...config,
      // showMarkers:false,
      container: this.element,
    });
    const domStyles: object = _get(getTheme(), ['components', 'tooltip', 'domStyles', CONTAINER_CLASS], {});
    _modifyCss(this.element, {...domStyles });

  }
  componentWillUnmount() {
    this.innerContent = null;
  }
  render() {
    this.overwriteCfg();
    console.log(this.props)
    return ReactDom.createPortal(<>
      <InnerContent ref={this.innerContent} />
    </>, this.element); // 无子组件
  }
}

export default withContainer(withChartInstance(Tooltip));

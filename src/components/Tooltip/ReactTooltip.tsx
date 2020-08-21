import React, { RefObject } from 'react';
import ReactDom from 'react-dom';

import _get from '@antv/util/lib/get';
import _modifyCss from '@antv/dom-util/lib/modify-css';
import withContainer from '../../boundary/withContainer';
import { withView } from '../../context/view';
import { getTheme } from '../../core';

import InnerContent from './inner';


const CONTAINER_CLASS: string = 'g2-tooltip';

export interface TooltipProps extends React.ComponentProps<any> {
  children?: (title?: string, items?: any[], x?: number, y?: number) => {},
  [key: string]: any;
}

class Tooltip extends React.Component<TooltipProps> {
  // HTMLElement
  protected element: HTMLElement ;

  private innerContent: RefObject<InnerContent> = React.createRef();
  private portal:  RefObject<HTMLDivElement> = React.createRef();

  constructor(props, context) {
    super(props, context);
    this.element = props.container;
    this.element.classList.add('bizcharts-tooltip');
    this.element.classList.add('g2-tooltip');
    this.element.style.width = 'auto';
    this.element.style.height = 'auto';

  }
  componentWillUnmount() {
    this.innerContent = null;
  }

  overwriteCfg() {
    const { chartView, children, domStyles = {}, ...config } = this.props;
    const { innerContent } = this;
    chartView.on('tooltip:change', ({title, items, x, y}) => {
      if (innerContent.current) {
        innerContent.current.refresh(children(title, items, x, y))
      };
    });
    chartView.tooltip({
      inPlot: false,
      domStyles,
      ...config,
      container: this.element,
    });

    // fixme: 主题要去图表主题，要meger domStyle。
    const domStylesTheme: object = _get(getTheme(), ['components', 'tooltip', 'domStyles', CONTAINER_CLASS], {});
    _modifyCss(this.element, {...domStylesTheme, ...domStyles[CONTAINER_CLASS]});

  }

  render() {
    this.overwriteCfg();
    return ReactDom.createPortal(<div ref={this.portal}>
      <InnerContent ref={this.innerContent} />
    </div>, this.element); // 无子组件
  }
}

export default withContainer<TooltipProps>(withView<TooltipProps>(Tooltip));

import React from 'react';
import _debounce from '@antv/util/lib/debounce';
import { getChartSize } from '@antv/g2/lib/util/dom';
import ResizeObserver from 'resize-observer-polyfill';

import ErrorBoundary, { ErrorFallback } from '../../boundary/ErrorBoundary';
import withContainer from '../../boundary/withContainer';
import RootChartContext from '../../context/root';
import ChartViewContext from '../../context/view';
import GroupContext from '../../context/group';
import { IChartProps } from '../../interface';
import ChartHelper from './chartHelper';
import { isFunction } from '@antv/util';

export class Chart extends React.Component<IChartProps> {
  protected resizeObserver: ResizeObserver;
  private chartHelper: ChartHelper;
  public readonly isRootView = true;
  private resize = _debounce(() => {
    const { chart } = this.chartHelper;
    if (this.props.autoFit && this.chartHelper.chart) {
      const { width, height } = getChartSize(
        this.props.container,
        this.props.autoFit,
        chart.width,
        chart.height
      );
      if (chart.width !== width || chart.height !== height) {
        chart.changeSize(width, height);
        chart.emit('resize');
      }
    }
  }, 300);
  static defaultProps = {
    placeholder: false,
    visible: true,
    interactions: [],
    filter: [],
  };
  constructor(props) {
    super(props);
    // 监听容器发生resize
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(props.container);
    this.chartHelper = new ChartHelper();
  }


  componentDidMount() {
    if (this.isError) {
      this.chartHelper.destory();
    } else {
      this.chartHelper.render();
    }
  }

  componentDidUpdate() {
    if (this.isError) {
      this.chartHelper.destory();
      return;
    }
    // 更新图表大小
    const { width, height, autoFit } = this.props;
    // 已经自适应就不更新大小了
    if (!autoFit && this.chartHelper.chart) {
      if (
        (width >= 0 && width !== this.chartHelper.chart.width) ||
        (height >= 0 && height !== this.chartHelper.chart.height)
      ) {
        const nextWidth = width || this.chartHelper.chart.width;
        const nextHeight = height || this.chartHelper.chart.height;
        // changeSize方法内部有调用render, 自动更新无需
        this.chartHelper.chart.changeSize(nextWidth, nextHeight);
        this.chartHelper.chart.emit('resize');
      } else {
        this.chartHelper.render();
      }
    } else {
      this.chartHelper.render();
    }
  }

  componentWillUnmount() {
    this.chartHelper.destory();
    this.resizeObserver.unobserve(this.props.container);
  }

  // 外部通过ref调用获取实例
  public getG2Instance() {
    return this.chartHelper.chart;
  }
  isError: boolean;

  render() {
    const { placeholder, data, errorContent } = this.props;
    let { ErrorBoundaryProps } = this.props;
    if ((data === undefined || data.length === 0) && placeholder) {
      this.chartHelper.destory();
      const pl = placeholder === true ? <div style={{ position: 'relative', top: '48%', color: '#aaa', textAlign: 'center' }}>暂无数据</div> : placeholder;
      return <ErrorBoundary {...ErrorBoundaryProps}>{pl}</ErrorBoundary>;
    }
    this.chartHelper.update(this.props);

    if (errorContent) {
      // 兼容 4.0 的用法
      ErrorBoundaryProps = {
        fallback: errorContent,
        ...ErrorBoundaryProps,
      }
    } else {
      // react-ErrorBoundary
      ErrorBoundaryProps = {
        FallbackComponent: ErrorFallback
      }
    }
    return (
      <ErrorBoundary
        {...ErrorBoundaryProps}
        key={this.chartHelper.key}
        onError={(...args) => { this.isError = true; isFunction(ErrorBoundaryProps.onError) && ErrorBoundaryProps.onError(...args)}}
        onReset={(...args) => { this.isError = false; isFunction(ErrorBoundaryProps.onReset) && ErrorBoundaryProps.onReset(...args)}}
        resetKeys={[this.chartHelper.key]} fallback={errorContent} >
        <RootChartContext.Provider  value={this.chartHelper}>
          <ChartViewContext.Provider value={this.chartHelper.chart}>
            <GroupContext.Provider value={this.chartHelper.extendGroup}>
              {this.props.children}
            </GroupContext.Provider>
          </ChartViewContext.Provider>
        </RootChartContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default withContainer<IChartProps>(Chart);

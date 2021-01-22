import React from 'react';
import * as plots from './plots';
import * as sparkline from './sparkline';
import warn from 'warning';

const PLOT_MAP = {
  ...plots,
  ...sparkline,
};

const DEFAULT_PLOT = 'Line';

type IOptions = Record<string, any>;
type IPlotCfg = {
  plotType: string,
  options: IOptions,
}

interface IAdapterProps {
  /**
   * 可覆盖组件displayName
   */
  chartName?: string,
  /**
   * options 转换器
   * @example
   * // 合并图表类型，或者做配置项转换
   * (opt) => {
   *   const options = {
   *     // 可配置默认数据
   *     data: [...],
   *     ...opt,
   *   }
   *
   *   return {
   *     plotType: opt.stackField ? 'StackColumn' : 'Column',
   *     options,
   *   }
   * }
   */
  adapter?: (IOptions) => IPlotCfg,
  [key: string]: any,
}

const PlotAdapter: React.FC<IAdapterProps> = (props) => {
  const { chartName, adapter, ...others } = props;
  const adapterFnc = adapter || ((opt) => {
    // 万能plot
    return { plotType: props.plotType || DEFAULT_PLOT, options: opt }
  });

  const { plotType, options } = adapterFnc(others) || {};
  const Plot = PLOT_MAP[plotType];
  Plot.displayName = chartName;

  if (!Plot) {
    return <div style={{ color: '#aaa' }}>不存在plotName=：{`${plotType}`}的Plot组件</div>;
  }

  return <Plot {...options} />
}

// @ts-ignore
PlotAdapter.registerPlot = (name: string, Component) => {
  warn(!PLOT_MAP[name], '%s的plot已存在', name);
  PLOT_MAP[name] = Component;
}

export default PlotAdapter;

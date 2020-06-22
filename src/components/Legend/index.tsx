import { useEffect } from 'react';
import _Legend from '@antv/g2/lib/chart/controller/legend';
import { LegendCfg, FilterCondition } from '@antv/g2/lib/interface';
import { Chart } from '@antv/g2/lib/chart';
import _isFunction from '@antv/util/lib/is-function';
import { registerComponentController } from '../../core';
import useChartView from '../../hooks/useChartView';
import { IEvent } from '../../interface';

import './actions';

registerComponentController('legend', _Legend);

export interface ILegend extends LegendCfg {
  /** 图例的对应到数据源中的数据字段名，不传则默认设置所有图例。 */
  name?: string;
  /** 图例是否可见 */
  visible?: boolean;
  /** 筛选 */
  filter?: FilterCondition;
  /** 连续图例值改变时 or 分类图例点击图例时 */
  onChange?: (e?: IEvent, chart?: Chart) => void;
  /** 来自父级的 chart 或者 view实例 */ 
  view?: any;
  [key: string]: any;
}
const undefinedField = name => (name === undefined);

// 单纯的赋值，重复执行不影响性能
export default function Legend(props: ILegend) {
  const { name, visible = true, onChange, filter, ...options } = props;
  const view = useChartView();
  if (undefinedField(name)) {
    // 不指定字段，则表示对图例进行整体配置
    if (visible) {
      view.legend(options);
    } else {
      view.legend(false);
    }
  } else {
    if (visible) {
      view.legend(name, options);
    } else {
      view.legend(name, false);
    }
  }

  // 图例默认置灰
  if (_isFunction(filter) && name) {
    view.filter(name, filter);
  }

  // 事件didmount后绑定一次即可
  useEffect(() => {
    // 连续图例
    view.on('legend:valuechanged',(ev: {
      /** [ start, end ] */
      originValue: [ number | any,  number | any ],
      /** [ start, end ] */
      value: [  number | any,  number | any ],
    }) => {
      if (_isFunction(props.onChange)) {
        props.onChange(ev, view)
      }
    });
    // 分类图例
    view.on('legend-item:click', (ev: IEvent) => {
      if (_isFunction(props.onChange)) {
        const { target } = ev;
        const delegateObject = target.get('delegateObject');
        const { item } = delegateObject; // 图例选项
        ev.item = item; // 快捷获取
        props.onChange(ev, view);
      }
    });
  }, []);

  return null;
}

import uniqueId from '@antv/util/lib/unique-id';
import _isString from '@antv/util/lib/is-string';
import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import ChartViewContext from '../context/view';

import { registerGeometryLabel } from '../core';
import Base, { IBaseProps } from '../Base';
import compareProps from '../utils/compareProps';
import './Label';

// 交互事件
import './actions';

registerGeometryLabel('base', GeometryLabel);

export interface IBaseGemo extends IBaseProps {}

export default abstract class BaseGeom<T extends IBaseGemo> extends Base<T> {
  name = 'gemo';
  ChartBaseClass = null;
  static contextType: any;
  protected interactionTyps: string[] = [];
  protected abstract readonly GemoBaseClassName: string;

  getInitalConfig() {
    return undefined;
  }
  initInstance() {
    const chart = this.context;
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = chart[this.GemoBaseClassName](options);
  }
  configInstance(preProps, curProps) {
    super.configInstance(preProps, curProps);

    compareProps(
      preProps,
      curProps,
      ['position', 'shape', 'color', 'label', 'style', 'tooltip', 'size'],
      (value, key) => {
        // value 已被转为array
        this.g2Instance[key](...value);
      },
    );
    compareProps(
      preProps,
      curProps,
      ['adjust'],
      (value, key) => {
        if (_isString(value[0])) {
          this.g2Instance[key](value[0]);
        } else {
          this.g2Instance[key](value);
        }
      },
    );

    // interaction 
    compareProps(preProps, curProps, this.interactionTyps, (value, key) => {
      if (value[0]) {
        this.context.interaction(key);
      } else {
        this.context.removeInteraction(key);
      }
    });
  }
  configInteraction() {}
}

BaseGeom.contextType = ChartViewContext;

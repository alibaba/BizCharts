import uniqueId from '@antv/util/esm/unique-id';
import _isString from '@antv/util/esm/is-string';
import GeometryLabel from '@antv/g2/esm/geometry/label/base';
import Base, { IBaseProps } from '../Base';
import ChartViewContext from '@/context/view';

import { registerGeometryLabel } from '../core';

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
    const nextProps = this.props;
    compareProps(
      preProps,
      nextProps,
      ['position', 'shape', 'color', 'label', 'style', 'tooltip', 'size'],
      (value, key) => {
        // value 已被转为array
        this.g2Instance[key](...value);
      },
    );
    compareProps(
      preProps,
      nextProps,
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
    compareProps(preProps, nextProps, this.interactionTyps, (value, key) => {
      if (value[0]) {
        this.context.interaction(key);
      } else {
        // unSave: g2-innerAPI
        this.context.interactions[key].destory();
      }
    });
  }
  configInteraction() {}
}

BaseGeom.contextType = ChartViewContext;

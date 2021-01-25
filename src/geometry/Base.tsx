import React from 'react';
import _isString from '@antv/util/lib/is-string';
import _isFunction from '@antv/util/lib/is-function';
import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import Geometry from '@antv/g2/lib/geometry/base';
import { IBaseGemoProps } from '../interface';
import ChartViewContext from '../context/view';
import { registerGeometryLabel } from '../core';
import compareProps from '../utils/compareProps';
import warn from 'warning';
import './Label';

// 交互事件
import './actions';
import cloneDeep from '../utils/cloneDeep';

registerGeometryLabel('base', GeometryLabel);

export { IBaseGemoProps };

const DEFAULT_SORT_GEOMETRYS = ['line', 'area'];

class GeomHelper {
  public view;
  public rootChart;
  public geom: Geometry;
  public config: Record<string,any> = {};
  public GemoBaseClassName: string;
  public interactionTypes: string[];
  setView(view) {
    this.view = view;
    this.rootChart = view.rootChart || view; // 顶层chart实例
  }
  createGeomInstance(GemoBaseClassName, cfg) {
    this.geom = this.view[GemoBaseClassName](cfg);
    const { sortable } = cfg;
    // 复写原型
    // @ts-ignore
    this.geom.__beforeMapping = this.geom.beforeMapping;
    // @ts-ignore
    this.geom.beforeMapping = function(data) {

      const xScale = this.getXScale();
      if ( sortable !== false && data && data[0] && DEFAULT_SORT_GEOMETRYS.includes(GemoBaseClassName) && ['time', 'timeCat'].includes(xScale.type)) {
        this.sort(data);
      }
      return this.__beforeMapping(data);
    }
    this.GemoBaseClassName = GemoBaseClassName;
  }
  update(newConfig, component) {
    if (!this.geom) {
      this.setView(component.context);
      const { sortable, visible, connectNulls } = newConfig;
      const cfg = { sortable, visible, connectNulls };
      // 如果是时间类型则对数据排序
      this.createGeomInstance(component.GemoBaseClassName, cfg);
      this.interactionTypes = component.interactionTypes;
    }
    compareProps(
      this.config,
      newConfig,
      ['position', 'shape', 'color', 'label', 'style', 'tooltip', 'size', 'animate', 'state'],
      (value, key) => {
        // value 已被转为array
        warn(!(key === 'label' && value[0] === true), 'label 值类型错误，应为false | LabelOption | FieldString')
        this.geom[key](...value);
      },
    );
    compareProps(
      this.config,
      newConfig,
      ['adjust'],
      (value, key) => {
        if (_isString(value[0])) {
          this.geom[key](value[0]);
        } else {
          this.geom[key](value);
        }
      },
    );
    // 状态设置
    this.geom.state(newConfig.state || {});

    // selected 和 active 使用 interacttion 替代

    // setElements 设置 selected 和 active 默认值
    this.rootChart.on('processElemens', () => {
      if(_isFunction(newConfig.setElements)) {
        newConfig.setElements(this.geom.elements);
      }
    });

    // 交互
    // interaction 
    compareProps(this.config, newConfig, this.interactionTypes, (value, key) => {
      if (value[0]) {
        this.rootChart.interaction(key);
      } else {
        this.rootChart.removeInteraction(key);
      }
    });

    // 缓存
    this.config = cloneDeep(newConfig);
  }
  destroy() {
    if(this.geom) {
      this.geom.destroy();
      this.geom = null;
    }
    this.config = {};
  }
}



abstract class BaseGeom<T extends IBaseGemoProps> extends React.Component<T> {
  public geomHelper: GeomHelper;
  protected interactionTypes: string[] = [];
  constructor(props) {
    super(props);
    this.geomHelper = new GeomHelper()
  }
  componentWillUnmount() {
    this.geomHelper.destroy();
  }
  protected abstract readonly GemoBaseClassName: string;
  render() {
    this.geomHelper.update(this.props, this);
    return <>{React.Children.map(this.props.children, (ele) => {
      return React.isValidElement(ele) ? React.cloneElement(ele, {parentInstance: this.geomHelper.geom}) : <></>
    })}</>;
  }
}

BaseGeom.contextType = ChartViewContext;

export default BaseGeom;

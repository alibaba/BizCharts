import React from 'react';
import { getShapeAttrs, getConstraint } from '@antv/g2/lib/geometry/shape/area/util';
// 按需使用需要加载图形
import '@antv/g2/lib/geometry/shape/line';
import '@antv/g2/lib/geometry/shape/area';
import _isObject from '@antv/util/lib/is-object';
import _deepMix from '@antv/util/lib/deep-mix';
import _get from '@antv/util/lib/get';
import _set from '@antv/util/lib/set';
import { registerShape } from '../core';
import * as d3Color from 'd3-color';
import useChartView from '../hooks/useChartView';
import Line, { ILineGemoProps } from './Line';
import Point, { IPointGemoProps } from './Point';
import Area, { IAreaGemoProps }  from './Area';



export interface ILineAdvanceGemoProps extends ILineGemoProps {
  point?: boolean | IPointGemoProps,
  area?: boolean |  IAreaGemoProps,
}

const areaStyle = {
  "default":{
    "style":{
      "fill":"#5B8FF9",
      "fillOpacity":0.25,
      "stroke":null
    }
  },
  "active":{
    "style":{ "fillOpacity":0.5}
  },
  "inactive":{
    "style":{ "fillOpacity":0.4}
  },
  "selected":{
    "style":{"fillOpacity":0.5}
  }
}



const LineAdvance = (props: ILineAdvanceGemoProps) => {
  const { point, area, shape, ...cfg } = props;

  const pointCfg = { shape: 'circle' };
  const areaCfg = { shape: shape === 'smooth' ? 'gradient-smooth' : 'gradient' };

  const view = useChartView();
  const theme = view.getTheme();
  
  // todo: 需要g2层修改
  theme.geometries.area.gradient = areaStyle;

  // todo: 需要g2层修改
  theme.geometries.area['gradient-smooth'] = areaStyle;

  // 默认为shared
  if (_get(view, ['options', 'tooltip', 'shared']) === undefined) {
    _set(view, ['options', 'tooltip', 'shared'], true);
  };
  // 默认showCrosshairs
  if (_get(view, ['options', 'tooltip', 'showCrosshairs']) === undefined) {
    _set(view, ['options', 'tooltip', 'showCrosshairs'], true);
  };

  if (_get(view, ['options', 'tooltip', 'showMarkers']) === undefined) {
    _set(view, ['options', 'tooltip', 'showMarkers'], true);
  };

  if (_isObject(pointCfg)) {
    _deepMix(pointCfg, point);
  }

  if (_isObject(areaCfg)) {
    _deepMix(areaCfg, area);
  }

  return (<>
    <Line shape={shape} state={{
      default: { style: { shadowColor: '#ddd', shadowBlur: 3, shadowOffsetY: 2 } },
      active: { style: { shadowColor: '#ddd', shadowBlur: 3, shadowOffsetY: 5 } },
    }} {...cfg}/>
    {/* <Tooltip shared showMarkers showCrosshairs /> */}
    {!!area && <Area  {...cfg} tooltip={false} {...areaCfg} />}
    {!!point && <Point size={3} {...cfg} state={{
      active: { style: { stroke: '#fff', lineWidth: 1.5, strokeOpacity: 0.9 } },
    }} tooltip={false} {...pointCfg} />}
  </>)
}


// Area 几何标记默认的 shape：填充的区域图
registerShape('area', 'gradient', {
  draw(cfg: any, container: any) {
    const attrs = getShapeAttrs(cfg, false, false, this);
    const c = attrs.fill;
    const clr = d3Color.color(c);
    if (clr) {
      attrs.fill = `l (90) 0:${d3Color.rgb(clr.r, clr.g, clr.b, 1).formatRgb()} 1:${d3Color.rgb(clr.r, clr.g, clr.b, 0.1).formatRgb()}`;
    }
    // attrs.fill = 'red';
    const shape = container.addShape({
      type: 'path',
      attrs,
      name: 'area',
    });
    return shape;
  },
});

/**
 * 填充的平滑曲面图
 */
registerShape('area', 'gradient-smooth', {
  draw(cfg, container) {
    const { coordinate } = this;
    const attrs = getShapeAttrs(cfg, false, true, this, getConstraint(coordinate));
    const c = attrs.fill;
    const clr = d3Color.color(c);
    if (clr) {
      attrs.fill = `l (90) 0:${d3Color.rgb(clr.r, clr.g, clr.b, 1).formatRgb()} 1:${d3Color.rgb(clr.r, clr.g, clr.b, 0.1).formatRgb()}`;
    }
    // attrs.fill = 'red';
    const shape = container.addShape({
      type: 'path',
      attrs,
      name: 'area',
    });
    return shape;
  }
});
export default LineAdvance;

// Type definitions for bizcharts 3.1.0
// Project: https://github.com/alibaba/BizCharts
// Definitions by: yixin https://github.com/Leannechn;
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Last module patch version validated against: 3.1.0

import * as G2 from '@antv/g2/src';
import * as React from "react";

export = bizcharts;
export as namespace bizcharts;

declare namespace bizcharts{
  /**
   * origin G2
   **/
  type G2 = {
    version: string;
    Animate: G2.Animate;
    Chart: G2.Chart;
    Shape: G2.BashView;
    Global: G2.Global;
    Util:  G2.Util;
    DomUtil: G2.DomUtil;
    MatrixUtil: G2.MatrixUtil;
    PathUtil: G2.PathUtil;
    G: any;
    track: (enable: boolean) => void;
  }
  export const G2: G2;

  /**
   * Util
   */
  export const Util: G2.Util

  /**
   * shape
   */
  export const Shape: G2.Shape

  /**
   * Animate
   */
  export const Animate: G2.Animate

  /**
   * PathUtil
   */
  export const PathUtil: G2.PathUtil

  // some config type
  export let AxisTile: G2.AxisTile;
  export type AlignXType = 'left' | 'middle' | 'right';
  export type AlignYType = 'top' | 'middle' | 'bottom';
  export type CoordType = 'rect' | 'polar' | 'theta' | 'helix';
  export type CrosshairsType = 'rect' | 'x' | 'y' | 'cross';
  export type FacetType = 'rect' | 'list' | 'circle' | 'tree' | 'mirror' | 'matrix';
  export type GeomType = 'point' | 'path' | 'line' | 'area' | 'interval' | 'polygon' | 'edge' | 'schema' | 'heatmap' | 'pointStack' | 'pointJitter' | 'pointDodge' | 'intervalStack' | 'intervalDodge' | 'intervalSymmetric' | 'lineStack' | 'areaStack' | 'schemaDodge';
  export type GeomAdjustType = 'stack' | 'dodge' | 'jitter' | 'symmetric';
  export type MarkerType = 'circle' | 'square' | 'bowtie' | 'diamond' | 'hexagon' | 'triangle' | 'triangle-down' | 'hollowCircle' | 'hollowSquare' | 'hollowBowtie' | 'hollowDiamond' | 'hollowHexagon' | 'hollowTriangle' | 'hollowTriangle-down' | 'cross' | 'tick' | 'plus' | 'hyphen' | 'line';
  export type PositionType = 'top' | 'bottom' | 'left' | 'right';
  export type LegendPositionType = 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-bottom' | 'right-center' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  export type LegendLayoutType = 'vertical' | 'horizontal'
  export type triggerOnType = 'mousemove' | 'click' | 'none'

  /**
   * components
   */
  export interface AxisProps extends React.Props<any> {
    name?: string;
    visible?: boolean;
    position?: PositionType;
    title?: G2.AxisTile | boolean | null;
    line?: G2.Styles.line | null;
    tickLine?: G2.Styles.tickLine | null;
    label?: G2.AxisLabel | null;
    grid?: G2.AxisGrid | null;
    min?: number;
    zIndex?: number;
    subTickCount?: number;
    subTickLine?: G2.Styles.tickLine;
  }

  export interface BaseProps extends React.Props<any> {}

  export interface ChartProps extends React.DOMAttributes<{}>, React.Props<any> {
    width?: number;
    height: number;
    padding?:
      | string
      | {
          top: number;
          right: number;
          bottom: number;
          left: number;
        }
      | number
      | [number, number, number, number]
      | [string, string];
    background?:G2.Styles.background;
    plotBackground?: G2.Styles.background;
    forceFit?: boolean;
    animate?: boolean;
    pixelRatio?: number;
    data?: any;
    scale?: any;
    placeholder?: React.Node | string | boolean;
    filter?: Array<any>;
    className?: string;
    style?: React.CSSProperties;
    // 事件属性
    onGetG2Instance?(chart: G2.Chart): void;
    onPlotMove?(ev: G2.EventParams): void;
    onPlotEnter?(ev: G2.EventParams): void;
    onPlotLeave?(ev: G2.EventParams): void;
    onPlotClick?(ev: G2.EventParams): void;
    onPlotDblClick?(ev: G2.EventParams): void;
    onItemSelected?(ev: G2.EventParams): void;
    onItemUnselected?(ev: G2.EventParams): void;
    onItemSelectedChange?(ev: {
      shape: G2.Shape;
      data: any;
      preShape: G2.Shape;
      preData: any;
      geom: any;
    }): void;
    onTooltipChange?(ev: {
      tooltip: any;
      x: number;
      y: number;
      items: any;
    }): void;
    onTooltipShow?(ev: {
      tooltip: any;
      x: number;
      y: number;
    }): void;
    onTooltipHide?(ev: {
      tooltip: any;
    }): void;
    [event: string]: any;
  }

  export interface CoordProps extends React.Props<any> {
    transpose?: boolean,
    type?: CoordType,
    rotate?: number,
    scale?: [number, number],
    reflect?: 'x' | 'y',
    radius?: number,
    innerRadius?: number,
    startAngle?: number,
    endAngle?: number,
  }

  export interface FacetProps extends React.Props<any> {
    type?: FacetType;
    fields?: string | any[];
    margin?: number | number[];
    padding?: number | number[];
    showTitle?: boolean;
    autoSetAxis?: boolean;
    colTitle?: {
      offsetY?: number;
      style?: G2.Styles.text;
    };
    rowTitle?: {
      offsetX?: number;
      style?: G2.Styles.text;
    };
    eachView?: (view?: any, facet?: any) => void;
  }

  export interface GeomProps extends React.Props<any> {
    type?: GeomType;
    adjust?: string | string[] | {
      type?: GeomAdjustType;
      marginRatio?: number;
      dodgeBy?: string;
    }[];
    position?: string;
    color?: string | [string, string] | [string, string[]] | [string, (d?: any) => string];
    shape?: string | [string, string[]] | [string, (d?: any) => string];
    size?: number | string | [string, [number, number]] | [string, (d?: any) => number];
    opacity?: string | number | [string, (d?: any) => number];
    style?: object | [string, object];
    tooltip?: boolean | string | [string, (...args: any[]) => {name?: string; value: string}];
    select?: boolean | [boolean, any];
    active?: boolean; // 图形激活交互开关
    animate?: any;
    line?: G2.Styles.line | boolean;
    selected?: boolean;
  }

  export interface GuideProps extends React.Props<any> {}

  export interface LabelProps extends React.Props<any> {
    content?: string | [string, (x?: any, y?: any) => string];
    labelLine?: ((x?: any, y?: any) => G2.Styles.line) | G2.Styles.line | boolean;
    offset?: number;
    textStyle?: G2.Styles.text | ((t?: any) => G2.Styles.text);
    autoRotate?: boolean;
    formatter?: ((text?: any, item?: any, index?: number) => string) | number;
    htmlTemplate?: ((text?: any, item?: any, index?: number) => string) | string;
    labelEmit?: boolean;
  }

  export interface LegendProps extends React.Props<any> {
    name?: string;
    visible?: boolean;
    position?: LegendPositionType;
    layout?: LegendLayoutType;
    title?: boolean;
    offsetX?: number;
    offsetY?: number;
    itemGap?: number;
    itemMarginBottom?: number;
    itemWidth?: number;
    unChecked?: string;
    background?: G2.Styles.background;
    allowAllCanceled?: boolean;
    itemFormatter?: (val?: any) => string | number;
    marker?: string | MarkerType | ((x?: number, y?: number, r?: number, ctx?: CanvasRenderingContext2D) => void);
    textStyle?: G2.Styles.text;
    clickable?: boolean;
    hoverable?: boolean;
    selectedMode?: 'single' | 'multiple';
    onHover?: (ev: MouseEvent) => void;
    onClick?: (ev: MouseEvent) => void;
    useHtml?: boolean;
    container?: string; // useHtml 为true时生效
    containerTpl?: string;
    itemTpl?: string | ((value?: string, color?: string, checked?: boolean, index?: number) => string);
    'g2-legend'?: React.CSSProperties;
    'g2-legend-item'?: React.CSSProperties;
    'g2-legend-list-item'?: React.CSSProperties;
    'g2-legend-marker'?: React.CSSProperties;
    'g2-legend-text'?: React.CSSProperties;
    scroll?: boolean;
    // 连续图例
    slidable?: boolean;
    width?: number;
    height?: number;
    // 自定义混合图例
    custom?: boolean;
    items?: any[];
  }

  export interface TooltipProps extends React.Props<any> {
    useHtml?: boolean;
    type?: string;
    triggerOn?: triggerOnType;
    enterable?: boolean;
    showTitle?: boolean;
    title?: string
    crosshairs?:
      | {
          type?: CrosshairsType;
          style?: G2.Styles.background | G2.Styles.line;
        }
      | boolean;
    offset?: number;
    containerTpl?: string;
    itemTpl?: string;
    htmlContent?: (title?: string, items?: any[]) => string;
    'g2-tooltip'?: React.CSSProperties;
    'g2-tooltip-title'?: React.CSSProperties;
    'g2-tooltip-list'?: React.CSSProperties;
    'g2-tooltip-list-item'?: React.CSSProperties;
    'g2-tooltip-marker'?: React.CSSProperties;
    inPlot?: boolean;
    follow?: boolean;
    shared?: boolean;
    position?: PositionType;

  }


  export interface ViewProps extends React.Props<any> {
    id?: string;
    start?: {x: number; y: number};
    end?: {x: number; y: number};
    data?: any;
    animate?: boolean;
    scale?: {
      [fieldName: string]: any;
    };
    filter?: Array<any>;
  }

  export class Base<T> extends React.Component<T> {
    getParentInfo?(): {id: number | string; name: string};
    generateBaseTypedComponent?(name: string): Base<BaseProps>;
    id?: number | string;
    name?: string;
  }
  export class Chart extends React.Component<ChartProps>{
    getG2Instance?(): G2.Chart;
    _refCallback?(c: G2.Chart): void;
    hasViewSource?(): boolean;
  }
  export class Axis extends Base<AxisProps> {}
  export class Coord extends Base<CoordProps> {}
  export class Facet extends Base<FacetProps> {}
  export class Geom extends Base<GeomProps> {}
  export class Guide extends Base<GuideProps> {
    Line?: Base<GuideProps>;
    Image?: Base<GuideProps>;
    Text?: Base<GuideProps>;
    Region?: Base<GuideProps>;
    Html?: Base<GuideProps>;
    Arc?: Base<GuideProps>;
    RegionFilter?:Base<GuideProps>;
    DataMarker?:Base<GuideProps>;
    DataRegion?:Base<GuideProps>;
  }
  namespace Guide {
    interface LineProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      lineStyle?: G2.Styles.line;
      text?: {
        position?: string | number;
        autoRotate?: boolean;
        style?: G2.Styles.text;
        content?: string;
        offsetX?: number;
        offsetY?: number;
      }
    }
    export class Line extends Base<LineProps> {}

    interface ImageProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      src?: string;
      width?: number;
      height?: number;
      offsetX?: number;
      offsetY?: number;
    }
    export class Image extends Base<ImageProps> {}

    interface RegionProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      style?: G2.Styles.background;
    }
    export class Region extends Base<RegionProps> {}

    interface HtmlProps {
      position?: object | any[] | ((xScale?: any, yScale?: any) => any);
      alignX?: AlignXType;
      alignY?: AlignYType;
      html?: string;
      zIndex?: number;
      offsetX?: number;
      offsetY?: number;
    }
    export class Html extends Base<HtmlProps> {}

    interface ArcProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      style?: any;
    }
    export class Arc extends Base<ArcProps> {}

    interface TextProps {
      top?: boolean;
      position?: object | any[] | ((xScale?: any, yScale?: any) => any);
      content?: string;
      style?: G2.Styles.text;
      offsetX?: number;
      offsetY?: number;
    }
    export class Text extends Base<TextProps> {}

    interface RegionFilterProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      color?: string;
      apply?: Array<any>
    }
    export class RegionFilter extends Base<RegionFilterProps> {}

    interface DataMarkerProps {
      top?: boolean;
      position?: object | any[] | ((xScale?: any, yScale?: any) => any);
      content?: string;
      style?: object;
      display?: object;
      lineLength?: number;
      direction?: 'upward' | 'downward';
    }
    export class DataMarker extends Base<DataMarkerProps> {}

    interface DataRegionProps {
      top?: boolean;
      start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
      content?: string;
      style?: object;
      display?: object;
      lineLength?: number;
      regionStyle?: object;
      direction?: 'upward' | 'downward';
    }
    export class DataRegion extends Base<DataRegionProps> {}

  }
  export class Label extends Base<LabelProps> {}
  export class Legend extends Base<LegendProps> {}
  export class Tooltip extends Base<TooltipProps> {}
  export class View extends Base<ViewProps> {
    getViewId?(): string | number
  }
}

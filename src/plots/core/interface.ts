import { GeometryLabelCfg, LegendCfg, G2LegendTitleCfg } from '@antv/g2/lib/interface';
import { TooltipOptions } from '@antv/g2plot/lib/types/tooltip'
import { Meta } from '@antv/g2plot/lib/types/meta'
import { AxisCfg, AxisGridCfg } from '@antv/g2/lib/interface';
import { ListItem } from '@antv/component/lib/types';
import { AxisLabelCfg, AxisLineCfg, AxisTickLineCfg, AxisTitleCfg} from './dependents';

declare type formatterCallback = (text: string, item: ListItem, index: number) => any;

interface LegendTitle extends G2LegendTitleCfg {
    visible?: boolean,
}

export interface LengendOptions extends LegendCfg {
    visible?: boolean;
    /**
    * 请使用itemName.formatter替代
    * **分类图例适用**，图例项 name 文本的配置。
    * 属性结构如下：
    *
    * ```ts
    * {
    *   spacing?: number; // 图例项 name 同后面 value 的间距
    *   formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
    *   style?: ShapeAttrs; // 文本配置项
    * }
    * ```
    */
    formatter?: formatterCallback;
    /**
     * 请使用itemName替代
     * **分类图例适用**，图例项 name 文本的配置。
     * 属性结构如下：
     *
     * ```ts
     * {
     *   spacing?: number; // 图例项 name 同后面 value 的间距
     *   formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
     *   style?: ShapeAttrs; // 文本配置项
     * }
     * ```
     */
    text?: LegendCfg['itemName'];
    title?: LegendTitle;
}

export declare type LengendAPIOptions = false | LengendOptions;




export interface TooltipCfg extends TooltipOptions {
    visible?: boolean;
}

export type TooltipAPIOptions = false | TooltipCfg;




export interface LabelOptions extends GeometryLabelCfg {
    visible?: boolean;
    readonly formatter?: GeometryLabelCfg['content'];
}

export type LabelAPIOptions = false | LabelOptions;



interface AxisLine extends AxisLineCfg {
    visible?: boolean,
}
interface AxisGrid extends AxisGridCfg {
    visible?: boolean,
}
interface AxisLabel extends AxisLabelCfg {
    visible?: boolean;
    suffix?: string;
    /**
     * 5.0版本开始废除 offsetX,offsetY,用offset替代。
     * 4.1版本：x轴优先取offsetX,其次offsetY，y轴优先取offsetY,其次offsetX。
     */
    offsetX?: number,
     /**
     * 5.0版本开始废除 offsetX,offsetY,用offset替代
     * 4.1版本：x轴优先取offsetX,其次offsetY，y轴优先取offsetY,其次offsetX。
     */
    offsetY?: number,
}


interface AxisTickLine extends AxisTickLineCfg {
    visible?: boolean;
}

interface AxisTitle extends AxisTitleCfg {
    visible?: boolean;
    text?: string,
}

export interface AxisOptions extends AxisCfg {
    visible?: boolean;
    line?: null | AxisLine;
    grid?: null | AxisGrid;
    /**
    * 文本标签的配置项，null 表示不展示。
    * 属性结构如下：
    *
    * ```ts
    * {
    *   // 坐标轴文本的样式
    *   style?: ShapeAttrs;
    *   // label 的偏移量
    *   offset?: number;
    *   // 文本旋转角度
    *   rotate?: number;
    *   // 格式化函数
    *   formatter?: (text: string, item: ListItem, index: number) => any;
    *   // 是否自动旋转，默认 true
    *   autoRotate?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
    *   // 是否自动隐藏，默认 false
    *   autoHide?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
    *   // 是否自动省略，默认 false
    *   autoEllipsis?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
    * }
    * ```
    *
    * 详见 {@link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L127|AxisLabelCfg}
    */
    label?: null | AxisLabel,
    title?: null | AxisTitle;
    tickLine?: null | AxisTickLine;

}
export declare type AxisAPIOptions = false | (AxisOptions & Omit<Meta, 'values' | 'formatter'>);

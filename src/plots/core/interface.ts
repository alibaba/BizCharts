import { GeometryLabelCfg, LegendCfg, G2LegendTitleCfg } from '@antv/g2/lib/interface';
import { TooltipOptions } from '@antv/g2plot/lib/types/tooltip'


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
    formatter?: LegendCfg['itemName']['formatter'];
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

export declare type TooltipAPIOptions = false | TooltipCfg;




export interface LabelOptions extends GeometryLabelCfg {
    visible?: boolean;
    readonly formatter?: GeometryLabelCfg['content'];
}

export declare type LabelAPIOptions = false | LabelOptions;

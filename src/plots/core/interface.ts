import { GeometryLabelCfg, LegendCfg } from '@antv/g2/lib/interface';
import { TooltipOptions } from '@antv/g2plot/lib/types/tooltip'




export interface LengendAPIOptions extends LegendCfg {
    visible?: boolean,
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
    formatter?: LegendCfg['itemName']['formatter'],
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
    text?: LegendCfg['itemName'],
}

export interface TooltipAPIOptions extends TooltipOptions {
    visible?: boolean,
}

export interface LabelAPIOptions extends GeometryLabelCfg {
    visible?: boolean,
    readonly formatter?: GeometryLabelCfg['content'];
}
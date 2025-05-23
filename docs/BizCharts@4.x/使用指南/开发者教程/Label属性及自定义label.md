# Label属性及自定义label



本文只针对图形组件的label属性设置

## label属性配置GeometryLabelCfg

```js
// 配置方法
<Line position="x*y" label={["x", 
  { style: { fill: 'red' } }     // GeometryLabelCfg
]} />
```
```js
GeometryLabelCfg={
  /**
   * 用于声明渲染的 label 类型。
   * 当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染。
   */
  type?: string;
  /** 相对数据点的偏移距离。 */
  offset?: number;
  /** label 相对于数据点在 X 方向的偏移距离。 */
  offsetX?: number;
  /** label 相对于数据点在 Y 方向的偏移距离。 */
  offsetY?: number;
  /**
   * 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示。
   * 当 content 为 IGroup 或者 IShape 类型时，请使用相对定位，即 x 和 y 坐标都设为 0，G2 内部会整体做最后的 label 进行定位的。
   * 示例： https://g2.antv.vision/zh/examples/pie/basic#pie-custome-label
   */
  content?: string | IGroup | IShape | GeometryLabelContentCallback;
  /** label 文本图形属性样式。 */
  style?: LooseObject;
  /** label 是否自动旋转，默认为 true。 */
  autoRotate?: boolean;
  /**
   * 当且仅当 `autoRotate` 为 false 时生效，用于设置文本的旋转角度，**弧度制**。
   */
  rotate?: number;
  /**
   * 用于设置文本连接线的样式属性，null 表示不展示。
   */
  labelLine?: null | boolean | { style?: object };
  /** 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭。 */
  labelEmit?: boolean;
  /**
   * 文本布局类型，支持多种布局函数组合使用。
   *
   * 目前提供了三种：'overlap'，'fixed-overlap'，'limit-in-shape'：
   * 1. overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。
   * 2. fixed-overlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整。
   * 3. limit-in-shape: 剔除 shape 容纳不了的 label。
   *
   * @example
   * ```ts
   * layout: {
   *   type: 'overlap',
   * },
   * ```
   */
  layout?: GeometryLabelLayoutCfg | GeometryLabelLayoutCfg[];
  /**
   * 仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置。
   */
  position?:
    | ((data: Datum, mappingData: MappingDatum, index: number) => IntervalGeometryLabelPosition)
    | IntervalGeometryLabelPosition;
  /** 动画配置。 */
  animate?: AnimateOption | false | null;
}

/** interval label 的位置 */
type IntervalGeometryLabelPosition = 'top' | 'bottom' | 'middle' | 'left' | 'right';
```

## label文本类型

针对不同的图表类型有不同的文本标签类型。 默认提供了 4 种类型：

- 'base'，默认类型，用于直角坐标系下的图表
- 'interval'，用于 Interval 几何标记下所有图形的文本标注，比如柱状图等
- 'pie'，专用于饼图的文本标注，带有文本连接线
- 'polar'，用于极坐标系下图表的文本标注

一般情况下，已经根据用户声明的图形语法自动使用对应的文本标签类型，用户不需要再额外声明。但是当有特殊需求时（比如自定义了文本标签），用户可以通过 label() 接口中的 type 属性指定具体的文本标签类型:

```typescript
<Chart >
  <Interval positon="x*y" label={['y', {
      type: 'polar',
   }]} />
</Chart>
```

默认的 label 文本类型可以满足大部分的场景需求，但是总有一些特殊需求无法满足，所以 BizCharts抛出了可自定义 Label 以及自定义 Label 布局函数的G2底层的扩展功能。

## 自定义 Label

```typescript
import { registerGeometryLabel, GeometryLabel, Chart, Line } from 'bizcharts';

// Step 1
// 自定义 Label 类
// 需要继承 GeometryLabel 基类
class CustomLabel extends GeometryLabel {}

// Step 2
// 注册 CustomLabel
registerGeometryLabel('custom', CustomLabel);

// Step 3
// 使用
<Chart >
  <Line positon="x*y" label={['y', {
      type: 'custom',
   }]} />
</Chart>
```

自定义 Label 需要继承  GeometryLabel 基类，通过覆写相应的方法来定义 label 的渲染配置，关于  GeometryLabel 类的[详细介绍] (https://github.com/antvis/G2/blob/6115367677297415755512e2c4bec649988fab40/src/geometry/label/base.ts#L28)。



## 标签布局

对于文本标签，当数据过于密集时，就会存在文本遮挡重叠的问题，如下所示：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kwt5RalWEQIAAAAAAAAAAABkARQnAQ)

内置了多种文本布局方案：

- **overlap**: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。

| 散点图普通 label 布局                                                                               | 散点图指定 'overlap' label 布局                                                                     |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ki1QQYCLHNMAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*sDrwR5TaVZEAAAAAAAAAAABkARQnAQ) |

- **fixed-overlap**: 不改变 label 位置的情况下对相互重叠的 label 进行调整。

| map 普通布局                                                                                        | 指定 'fixed-overlap' label 布局                                                                      |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wk0WSZtriRAAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*e8xtSqJMGMkAAAAAAAAAAABkARQnAQ) |

- **limit-in-shape**: 剔除 shape 容纳不了的 label。

| treemap 普通布局                                                                                    | 指定 'limit-in-shape' label 布局                                                                      |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hI46TrDtlFcAAAAAAAAAAABkARQnAQ) | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*81mZT4lSviAAAAAAAAAAAABkARQnAQ) |

- 饼图label布局'pie-spider'
| pie 普通布局                                                                                    | 指定 'pie-spider' label 布局                                                                      |
| :-------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![image.png](https://img.alicdn.com/imgextra/i2/O1CN01Im6YEz1GrC2NbJClc_!!6000000000675-2-tps-342-335.png) | ![image.png](https://img.alicdn.com/imgextra/i2/O1CN016JVanM23bXg3eWiGC_!!6000000007274-2-tps-375-288.png) |


配置方式：

```typescript
<Chart>
    <Polygon 
        position={'longitude*latitude'}
        label={['name', {
          layout: {
            type: 'fixed-overlap',
           },
        }]}
    />
</Chart>
```

对于文本布局，有多种解决方案，为了更大的灵活，提供了自定义 label 布局的机制，用户可以根据需求自定义 label 布局

## 自定义 Label 布局函数

对于文本布局，有多种解决方案，为了更大的灵活，提供了自定义 label 布局的机制，用户可以根据需求自定义 label 布局。

```typescript
import { registerGeometryLabelLayout, Chart, Interval } from 'bizcharts';

// Step 1: 定义 label 布局函数
function limitInShape(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  each(labels, (label, index) => {
    const labelBBox = label.getCanvasBBox(); // 文本有可能发生旋转
    const shapeBBox = shapes[index].getBBox();
    if (
      labelBBox.minX < shapeBBox.minX ||
      labelBBox.minY < shapeBBox.minY ||
      labelBBox.maxX > shapeBBox.maxX ||
      labelBBox.maxY > shapeBBox.maxY
    ) {
      label.remove(true); // 超出则不展示
    }
  });
}

// Step 2: 注册 label 布局函数
registerGeometryLabelLayout('limit-in-shape', limitInShape);

// Step 3: 使用
<Chart>
    <Interval 
        adjust={'stack'}
        position={'value'}
        color={'type'}
        shape={'slice-shape'}
        label={['type', {
          layout: {
              type: 'limit-in-shape',
          },
        }]}
    />
</Chart>
```
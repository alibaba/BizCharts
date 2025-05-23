# Annotation

图形标注，Annotation，作为图表的辅助元素，主要用于在图表上标识额外的标记注解。

<div>
## 图形标注类型：
| 组件   | 描述 |  示例 | 用法 |
| ------ | --- |  ---- | ---- |
| Line | 辅助线（可带文本）,例如表示平均值或者预期分布的直线。 | ![line](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ) | `<Annotation.Line />` |
| Arc  | 辅助弧线，只在极坐标系下生效。常用于绘制仪表盘。 | ![arc](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ) | `<Annotation.Arc />` |
| Text | 辅助文本，指定位置添加文本说明 | ![text](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ) | `<Annotation.Text />` |
| Image | 辅助图片，在图表上添加辅助图片。 | ![Image](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ) | `<Annotation.Image />` |
| Region | 辅助框，框选一段图区，设置背景、边框等。 | ![Region](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ) | `<Annotation.Region />` |
| RegionFilter | 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。 | ![RegionFilter](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ) | `<Annotation.RegionFilter />` | 
| DataMarker | 特殊数据点标注，多用于折线图和面积图。 | ![DataMarker](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ) |  `<Annotation.DataMarker />` |
| DataRegion  | 特殊数据点标注，多用于折线图和面积图。 | ![dataRegion](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ) |  `<Annotation.DataRegion />` |
| Html | 自定义任意 HTML 类型的图形标记 | ![html]() | `<Annotation.Html />` |

## API

### 通用API

#### top
_<boolean>_

- 描述：指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层

#### style
_<object>_

- 描述：图形样式属性，详细[绘图属性](/product/BizCharts4/category/61/page/114)

#### animate
_<boolean>_

- 描述：是否进行动画


#### offsetX
_<number>_

- 描述：x 方向的偏移量

#### offsetY
_<number>_

- 描述：y 方向的偏移量

#### 定位方式属性

有两种定位方式，*RegionPosition*和*PointPosition*。

其中使用*RegionPosition*方式定位的组件具有start和end属性。

使用*PointPosition*方式定位的组件具有position属性。

> **使用RegionPosition的组件有：Image，Line，Arc，Region，DataRegion，RegionFilter**

#### start
_<array>_ _<function>_

- 描述：起始位置

      - 数组内可以使用 'min', 'median', 'max' 关键字，代表原始值的最小值、平均值、最大值，例如： [0, 'min'] 表示 x 轴上数值为 0，y 轴位置在数值的最小值上；

      - 表示位置的数组可以换成回调函数，函数原型： `function(xScale, yScales) {return [];}`

#### end
_<array>_ _<function>_

- 描述：结束位置

      - 数组内可以使用 'min', 'median', 'max' 关键字，代表原始值的最小值、平均值、最大值，例如： [0, 'min'] 表示 x 轴上数值为 0，y 轴位置在数值的最小值上；

      - 表示位置的数组可以换成回调函数，函数原型： `function(xScale, yScales) {return [];}`

- 注意：
柱状图水位线绘制时建议用百分比
```js
<Annotaion.Line
  start=['0%', '80%']
  end=['100%', '60%']
/>
```
效果如图
![](https://img.alicdn.com/tfs/TB1KzuRQuL2gK0jSZFmXXc7iXXa-844-965.png)

如start和end使用min和max，会出现线绘制不全的问题，从中心线开始计算
```js
<Annotaion.Line
  start={['min', '120']}
  end={['max', '180']}
/>
```
效果如图
![](https://img.alicdn.com/tfs/TB1PbWAQxD1gK0jSZFsXXbldVXa-856-959.png)

> **使用PointPosition的组件有：Text，DataMarker**

#### position
_<array>_ _<function>_

- 描述：定位位置

      - 数组内可以使用 'min', 'median', 'max' 关键字，代表原始值的最小值、平均值、最大值，例如： [0, 'min'] 表示 x 轴上数值为 0，y 轴位置在数值的最小值上；

      - 表示位置的数组可以换成回调函数，函数原型： `function(xScale, yScales) {return [];}`

### 组件特有API

### Line

#### text
_<object>_

- 描述：文本配置定义
```js
<Annotation.Line
  start={['min', 2.517]}
  end={['min', 3.83]}
  text={{
    /** 文本位置，除了制定 'start', 'center' 和 'end' 外，还可以使用百分比进行定位， 比如 '30%' */
    position: 'start' | 'center' | 'end' | string,
    /** 是否自动旋转 */
    autoRotate?: boolean,
    /** 显示的文本内容 */
    content: string,
    /** 文本的图形样式属性 */
    style?: object,
    /** x 方向的偏移量 */
    offsetX?: number,
    /** y 方向偏移量 */
    offsetY?: number,
  }}
/>
```

### Text

#### content
_<required>_ _<string>_ _<number>_

- 描述：显示的文本内容

#### rotate
_<number>_

- 描述：文本的旋转角度，弧度制
```js
<Annotation.Text
  position={[0,'max']}
  content="显示文本"
  rotate={Math.PI * 0.25}
/>
```

### Image

#### src
_<required>_ _<string>_

- 描述：图片路径
```js
<Annotation.Image
  start={['min', 2.517]}
  end={['min', 3.83]}
  src="..."
/>
```

### RegionFilter

#### color
_<required>_ _<string>_

- 描述：染色色值

#### apply
_<array>_

- 描述：可选,设定regionFilter只对特定geom类型起作用，如apply:['area']

```js
<Annotation.RegionFilter
  start={['min', 2.517]}
  end={['min', 3.83]}
  color="#BAE7FF"
  apply={['area']}
/>
```
### DataMarker

#### point
null _<object>_

- 描述：点设置，point：{ style?: object }。

#### line
null _<object>_

- 描述：线条样式设置，line：{ style?: object, length?: number }。

#### text
null _<object>_

- 描述：文本设置，text：{ style?: object, content: string }。

#### autoAdjust
_<boolean>_

- 描述：文本超出绘制区域时，是否自动调节文本方向，默认为 true

#### direction
_<string>_

- 描述：朝向，默认为 upward，可选值为 'upward' 或者 'downward'

```js
<Annotation.DataMarker
  position={[0,'max']}
  point={{
    style: object,
  }}
  line={{ style?: object, length?: number }}
  text={{ style?: object, content: string }}
  autoAdjust
  direction='downward'
/>
```

### DataRegion

#### lineLength
_<number>_

- 描述：line长度，default为 0

#### region
null _<number>_

- 描述：标注区间的配置，region：{ style?: object }。

#### text
null _<object>_

- 描述：文本设置，text：{ style?: object, content: string }。

```js
<Annotation.DataRegion
  start={['min', 2.517]}
  end={['min', 3.83]}
  region={{ style?: object }}
  lineLength={10}
  text={{ style?: object, content: string }}
/>
```
### Region
![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ)

辅助框，框选一段图区，设置背景、边框等，配置属性查看[通用API](/product/BizCharts4/category/62/page/108#通用api)。

### Arc
配置属性查看[通用API](/product/BizCharts4/category/62/page/108#通用api)。

### Html

#### container

- 描述：可选，自定义 HTML 图形标记的容器元素：
-  string_HTMLElement optional

#### html

- 描述：自定义的图形标记的 HTML 元素，可为 HTML DOM 字符串，或 HTML 元素，或 html 回调函数
-  string_HTMLElement _((container: HTMLElement, view: View) => void | string | HTMLElement)

#### alignX
_<string>_

- 描述：DOM 元素在 X 方向的对齐方式
- 'left' | 'middle' | 'right' optional default: 'left'

#### offsetX
_<number>_
- 描述：X 方向的偏移

#### offsetY
_<number>_
- 描述：Y方向的偏移



```js
  <Annotation.Html
    html="<div style='color:red'>Annotation.Html</div>"
   offsetX={40}
   offsetY={-50}
 />
```
# Tooltip



提示信息(tooltip)组件，是指当鼠标悬停在图表上的某点时，以提示框的形式展示该点的数据，比如该点的值，数据单位等。

<img src="https://gw.alipayobjects.com/zos/rmsportal/VLNhkKRALafPtDCIZFqA.png" width="415px">


## 使用

* BizCharts 默认开启 `<Tooltip />`，如需关闭则使用visible=false来关闭。如果chart是pure模式则相反。
```js
<Chart width={600} height={400} data={data}>
  <Tooltip visible={false} /> // 关闭图表tooltip功能
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>

// pure 模式
<Chart pure width={600} height={400} data={data}>
  <Tooltip /> // 开启图表tooltip功能
  <Geom type="bar" position="genre*sold" color="genre" />
</Chart>
```

## 组成
![](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

## API

### showTitle 
_<boolean>_
- 描述：是否展示 tooltip 标题。

### title 
_<string>_
- 描述：设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。

### showMarkers 
_<boolean>_
 - 描述：是否展示鼠标所在当前数据的标记。

### marker 
_<object>_
 - 描述：当前数据标记的样式。

### showContent 
_<boolean>_
- 描述：是否展示 tooltip 内容框。

### position 
_<string>_
 - 描述：该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：`left`、`right`、`top`、`bottom`。

### shared 
_<boolean>_
 - 描述：是否展示多条 tooltip, 默认值:false;false表示只展示单条 tooltip。在图表有多个图形组件的时候建议开启。
 - `<Tooltip shared={true}/>`

### follow 
_<boolean>_
- 描述：设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。

### offset 
_<number>_
- 描述：设置 tooltip 距离鼠标的偏移量。

### enterable
_<boolean>_
tooltip 是否允许鼠标滑入，默认为 false，不允许。

### lock 
_<boolean>_
- 描述：用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。
> 注意需要额外注册交互，并且通过鼠标点击图标来关闭和开启鼠标移入，具体查看[允许鼠标移入DEMO](https://bizcharts.net/product/BizCharts4/demo/475)

### showCrosshairs
- 描述：是否展示 crosshairs

### crosshairs 
_<object>_
- 描述：配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效, 该属性可支持的配置如下。
```js
{
  /**
   * crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项。
   */
  type?: 'x' | 'y' | 'xy';
  /**
   * 辅助线的样式配置。
   */
  line?: {
     style?: ShapeAttrs; // 线的样式配置
  };
  /**
   * 辅助线文本配置，支持回调。
   */
  text?: string | function;
 
      <Tooltip
        text={(    // function
          type: string, // 对应当前 crosshairs 的类型，值为 'x' 或者 'y'
          defaultContent: any, // 对应当前 crosshairs 默认的文本内容
          items: any[], // 对应当前 tooltip 内容框中的数据
          currentPoint: Point // 对应当前坐标点
        ) => ({
          content: string, // crosshairs 文本内容
          autoRotate: Boolean, // 是否自动旋转
          style: shapeAttr(https://bizcharts.alibaba-inc.com/product/BizCharts4/category/61/page/114), // 	文本的配置项
          position: 'start' | 'end', // 文本位置
          offset: number, // 距离线的距离
        })}
      />
  /**
   * 辅助线文本背景配置。
   */
  textBackground?: {
     padding?: number | number[]; // 文本背景周围的留白
     style?: ShapeAttrs; // 文本背景的样式
  }
  /** 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点 */
  follow?: boolean;
}
```
柱状图的tooltip hover背景是需要通过交互组件Interaction进行配置达到以下效果
```js
<Chart data={[...]}>
  <Tooltip shared />
  <Interval position="x*y" adjust="dodge" />
  <Interaction type="active-region" />
</Chart>
```
![分组柱状图交互](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*MDg9TKxREFcAAAAAAAAAAABkARQnAQ)

### container 
_<string>_ _<HTMLElement>_
- 描述：自定义 tooltip 的容器。

### linkage 
_<string>_ _<[string, function]>_
实现tooltip的联动。如果都是直角坐标系，宽高相等且无堆叠的情况，可以只配置一个关联的linkagekey，配置了相同的linkagekey值的图表
会自动关联tooltip交互。如果获取关联不是则需要配置为数组，第一个参数是linkagekey，第二个参数是触发的数据，映射到当前图表的关联函数
返回当前图表被触发tooltip的像素坐标`{x: number, y: number }`  
⚠️：堆叠和分组情况下,需要计算出堆叠后的数据坐标。然后return chart.getXY(数据坐标) 来映射关联。
使用方式如下：
简单使用：
```
<Chart data={[...]} width={300} height={400}>
  <Tooltip shared linkage="someKey" />
  <Interval position="x*y" adjust="dodge" />
  <Interaction type="active-region" />
</Chart>

<Chart data={[...]} width={300} height={400}>
  <Tooltip shared linkage="someKey" />
  <Interval position="x*y" adjust="dodge" />
  <Interaction type="active-region" />
</Chart>
```
映射关联
```
<Chart data={[...]} width={300} height={400}>
  <Tooltip shared linkage="someKey" />
  <Interval position="x*y" adjust="dodge" />
  <Interaction type="active-region" />
</Chart>

<Chart data={[...]} width={300} height={400}>
  <Tooltip shared linkage={["someKey", (records, chart) => {
     // @records 是其他配置了someKey的图表触发tooltip的数据。
     // @chart 是当前图表的实例
     // 返回关联到当前图表关联数据,即x 相同的数据，在当前图表中的位置。
      const item = records[0].data;
      const d = data2.find(it => it.x === item.x )；
      return chart.getXY(d); // 当找不到关联数据，返回值是null 或者undefined，则当前图表不展示tooltip
  }]} />
  <Interval position="x*y" adjust="dodge" />
  <Interaction type="active-region" />
</Chart>
```


### containerTpl 
_<string>_
- 描述：用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。
```
  containerTpl= '<div class="g2-tooltip">'
  + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
  + '<ul class="g2-tooltip-list"></ul>'
  + '</div>',
```
### itemTpl 
_<string>_
- 描述：每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。可以格式化 tooltip 的显示内容。
默认值:
```js
itemTpl= '<li data-index={index}>'
  + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
  + '{name}: {value}'
  + '</li>'

```
> 如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。


### domStyles 
_<object>_
- 描述：传入各个 dom 的样式。
```js
{
  'g2-tooltip'?: object;
  'g2-tooltip-title'?: object;
  'g2-tooltip-list'?: object;
  'g2-tooltip-list-item'?: object;
  'g2-tooltip-marker'?: object;
  'g2-tooltip-value'?: object;
  'g2-tooltip-name'?: object;
}
```

### region
_<null>_ _<object>_  
配置tooltip绘制的区域范围，默认是图表区域内。如果配置为null，则可以超出图表区域。
```js
<Tooltip region={null} />
```

## 自定义Tooltip
当子组件是个函数的时候，返回的react组件将覆盖tooltip内容,其他配置属性同上。

```js
  <Tooltip>
    {(title,items) => {
      console.log(title,items);
      // items 是个数组，即被触发tooltip的数据。
      // 获取items的颜色
      const color = items[0].color;
      return <div>自定义tooltip</div>
    }}
  </Tooltip>
```
## 其他配置
bizcharts 提供了三个层级的 Tooltip 开关配置：

* Chart 控制整个图表的 tooltip 开关，当Tooltip为Chart子组件则将 tooltip 关闭，view 及 geometry 上的 tooltip 配置均不生效，整个图表 tooltip 关闭。
```js
<Chart>
 <Tooltip visible={false} />
</Chart>
```
* View 控制当前 View 的 tooltip 开关，当Tooltip为View子组件则将 tooltip 关闭时，当前 view tooltip 将被关闭，其下所有 Geometry 几何标记的 tooltip 配置均不生效。
```js
<Chart>
 <View>
   <Tooltip visible={false} />
 </View>
</Chart>
```
* Geometry 控制当前 Geometry 几何标记的 tooltip 开关,该 Geometry 的数据将不展示在 tooltip 内容框中
```js
<Chart>
 <Geom tooltip={false} />
</Chart>
```




# Label

[`<Geom>`](27) 几何标记上的标注文本组件。

恰当的文本标注可以提高可视化图表的可读性。除了提供文本标签标注的功能之外，G2 还支持文本的格式化以及自定义 html 文本标签的功能。
![](https://gw.alipayobjects.com/zos/rmsportal/lSasYkLULFIHYIpEIeUw.png)


## 父组件
[`<Geom />`](27)

## 子组件
无

## 如何使用
在每个几何标记 Geom 内使用 Label 组件。
```js
<Chart height={400} data={data} forceFit>
    <Axis name="year" />
    <Axis name="sales" />
    <Tooltip
      crosshairs={{
        type: "y"
      }}
    />
    // 指定显示文本标签
    <Geom type="interval" position="year*sales"> 
      <Label 
        content="percent"
        offset={10} // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle= {{
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#404040', // 文本的颜色
          fontSize: '12', // 文本大小
          fontWeight: 'bold', // 文本粗细
          textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
        }}
        //textStyle={()=>{}}// 支持回调 
        rotate={30}
        autoRotate= {false} // 是否需要自动旋转，默认为 true
        formatter={()=>{}}, // 回调函数，用于格式化坐标轴上显示的文本信息
        htmlTemplate= {()=>{}}, // 使用 html 自定义 label
      />
    </Geom>
</Chart>
```
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841763704-ec891d93-1a16-4eb7-aa55-3616b9f0e092.png?x-oss-process=image/resize,w_746)

## API
### content
_<String>_ _<Array:[String, Function]>_
* 描述：指定 label 上显示的文本内容，可以是数据纬度，也可以自定义。

使用示例:
```js
<Label content="常量字符串" />
// 使用数据
<Label content="sales*date"/>
// 使用回调函数
<Label content={["sales*date", (sales, date)=>{
    return ${data}:${sales};
  }]}
/>
```

### labelLine
_<Object>_
* 描述：文本距离几何线的配置，如果值为`false`，表示不展示文本线。默认不展示。

使用示例:
```js
<Label
  content="some label"
  labelLine={{
    lineWidth: 1, // 线的粗细
    stroke: '#ff8800', // 线的颜色
    lineDash: [ 2, 1 ], // 虚线样式
  }}
/>
```

### position
_<String>_
* 描述：设置文本处于几何图形的哪个位置，支持的配置："top" | "middle" | "bottom"

### offset
_<Number>_
* 描述：设置文本距离几何图形的的距离
### offsetX
_<Number>_
* 描述：设置文本在X轴方向的偏移量
### offsetY
_<Number>_
* 描述：设置文本在Y轴方向的偏移量

### textStyle
_<Object>_
* 描述：文本的图形样式。其他样式请参考[绘图属性](./40)
```js
<Label
  content='sales'
  textStyle={{
    textAlign: 'start', // 文本对齐方向，可取值为： start middle end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    rotate: 30,
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  }}
/>
```

样式值支持回调：
```js
<Label
  content='sales'
  textStyle={sales=>{
    const style = {textAlign: 'center'};
    if(if(sales > 1000)) {
      style.fill = '#ff0000';
    } else {
      style.fill = '#00ff00';
    }
    return style;
  }}
/>
```

### autoRotate
_<Boolean>_
* 描述：是否需要自动旋转，默认值：`true`。

### formatter
_<Function>_
* 描述：用于格式化坐标轴上显示的文本信息。
```js
<Label
  content='name'
  formatter={(text, item, index)=>{
    // text 为每条记录 x 属性的值
    // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
    // index 为每条记录的索引
	var point = item.point; // 每个弧度对应的点
	var percent = point['percent'];
	percent = (percent * 100).toFixed(2) + '%';
	return name + ' ' + percent;
  }}
/>
```
![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841790486-6ef488aa-812c-4ddf-a9d1-1c6df32cd94a.png?x-oss-process=image/resize,w_746)

### htmlTemplate
_<Function>_
* 描述：自定义 html 文本
```js
<Label
  content='name'
  htmlTemplate={(text, item, index)=>{
    // text 为每条记录 x 属性的值
    // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
    // index 为每条记录的索引
	var point = item.point; // 每个弧度对应的点
	var percent = point['percent'];
	percent = (percent * 100).toFixed(2) + '%';
	// 自定义 html 模板
	return '<span class="title" style="display: inline-block;width: 50px;">' + text + '</span><br><span style="color:' + point.color + '">' + percent + '</span>';
  }
/>
```

### type
_<String>_
* 描述：文本类型，隐藏非必要文本，尽量避免文本互相遮挡
* 取值：scatter: 按照散点图 label 布局算法对所有 label 进行二次布局。数据过于密集的情况下会剔除放不下的 label；treemap: 剔除形状容纳不了的 label；map: label 将会初始定位到地图板块的可视中心，为了防止 label 之间相互覆盖布局，尝试向四周偏移，会剔除放不下的 label。
```jsx
<Label  type='scatter | treemap | map'/>
```
[详细文档地址](https://www.yuque.com/antv/g2-docs/api-geom#99882875)

![](https://cdn.nlark.com/yuque/0/2018/png/100996/1539841824912-9d43e749-c68d-47bd-9d39-e8f4a405d8f1.png?x-oss-process=image/resize,w_404)

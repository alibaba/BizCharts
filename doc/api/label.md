
# Label
[`<Geom>`](geom.md) 几何标记上的标注文本组件。

## 使用说明
`<Label ／>` 组件只能够被嵌套在 [`<Geom/>`](geom.md) 组件内,如下所示。
```jsx
<Geom>
  <Label content='sales' />
</Geom>
```

## 属性
### 1、content 	* String | Array:[String, Function] *
指定 label 上显示的文本内容，可以是数据纬度，也可以自定义。
使用示例:
```jsx
<Label
  content="常量字符串"
  //或者
  content="sales*date"
  //或者
  content={["sales*date", (sales, date)=>{
    return `${data}:${sales}`;
  }]}
/>
```
### 2、labelLine     * Object *
文本距离几何线的配置，如果值为 false，表示不展示文本线。
默认不展示。
使用示例:
```jsx
<Label
  labelLine={{
    lineWidth: 1, // 线的粗细
    stroke: '#ff8800', // 线的颜色
    lineDash: [ 2, 1 ], // 虚线样式
  }}
/>
```

### 3、offset  	* Number *
设置文本距离几何图形的的距离

### 4、textStyle  	* Object *
文本的图形样式。
可配置样式值有：
 ```jsx
<Label
  content='sales'
  textStyle={{
    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    rotate: 30,
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  }}
/>
```
样式值支持回调：
```jsx
<Label
  content='sales'
  textStyle={{
    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
    fill: (sales)=>{
	  if(sales > 1000)
	    return '#ff0000';
	  return '#00ff00';
	}
  }}
/>
```

### 5、autoRotate  	* Boolean *
是否需要自动旋转。
默认值：true

### 6、formatter  	* Function *
用于格式化坐标轴上显示的文本信息。
```jsx
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

### 7、htmlTemplate  	* Function *
自定义 html 文本
```jsx
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

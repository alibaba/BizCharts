# Group



Group组件作为父组件，可把组件内的多个Shape图形组件作为一个整体来进行渲染绘制，优化性能。

## 使用方法

```js
<Canvas width={800} height={400} id="test">
      <Group>
            <Line attrs={{
                x1: 200,
                y1: 100,
                x2: 400,
                y2: 100,
                stroke: '#1890FF',
                lineWidth: 2,
             }} />
      </Group>
</Canvas>
```

# 区块介绍

bizcharts 区块介绍

## 预览图

给个预览图

## 命令

> 具体开发流程顺序如下

### 启动 & 调试

```
fie start
```

### 编译

```
fie build
```

### 发布

**发布日常**

```
fie publish d
```

**发布线上**

```
fie publish
```

**只发布 npm 包**

```
fie publish package
```

## 目录结构

```
.
├── README.md
├── index.html
├── demo // 本地调试目录
├── lib // babel 编译 src 后输出的目录
├── db.json // 给 ice 打包用的，开发者无需关心
├── package.json
├── src // 源代码
└── webpack.config.js // webpack 配置
```
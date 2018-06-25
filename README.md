# Material

bizcharts 物料，主要给 [Ice](https://alibaba.github.io/ice/) 使用。

## 说明

该分支包含将近 187 个区块，及 5 个模板。
<br />
<br />
所有的物料都是独立的 npm package ，区块存放于 `blocks` 目录下，模板存放于 `scffolds` 目录下，统一采用 [lerna](https://github.com/lerna/lerna) 进行管理发布。

### 如何发布

仓库下载后，并安装好 [lerna](https://github.com/lerna/lerna)，执行 `lerna publish` 后，即可发布改动的模块。

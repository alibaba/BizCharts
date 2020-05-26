// todo: 提供打包优化插件
class BxHappyPack {
  apply(compiler) {
    compiler.hooks.entryOption.tap('Hello World Plugin', (
      stats
    ) => {

    });
  }
}

module.exports = BxHappyPack;

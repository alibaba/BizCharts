const fs = require('fs');

/**
 *
 * @param {String} 匹配路径
 *
 * @param {String | RegExp | Array} 匹配的正则表达式
 *
 * @param {String | Array} 替换的内容，如果是多个数组中的index顺序要保持和 reg 中的 index相同，不然会替换错误！！！
 *
 * @returns {void}
 */
function miniReplace(path, reg, replaceWord) {
  // 进行参数验证
  if (typeof path !== 'string') {
    throw new Error(
      'the argument path expected a string. Place make sure you are using the right type of the argument.'
    );
  }
  if (!(typeof reg === 'string' || Object.prototype.toString.call(reg) ===
      '[object RegExp]' || Array.isArray(reg))) {
    throw new Error(
      'the argument reg expected a string or a RegExp or an Array. Place make sure you are using the right type of the argument.'
    );
  }
  if (!(typeof replaceWord === 'string' || Array.isArray(reg))) {
    throw new Error(
      'the argument path expected a string or an Array. Place make sure you are using the right type of the argument.'
    );
  }
  // step1 找到要修改的文件集合
  const files = [];

  function ScanDir(originalPath) {
    if (fs.statSync(originalPath).isFile()) {
      return files.push(originalPath);
    }
    try {
      fs.readdirSync(originalPath).forEach((file) => {
        ScanDir(originalPath + '/' + file);
      });
    } catch (e) {
      console.error(e);
    }
  }
  ScanDir(path);
  // step2 遍历集合中的文件，匹配对应的正则，找到合适修改内容，把内容替换
  files.forEach((item) => {
    const data = fs.readFileSync(item, 'utf-8');
    let newdata = data;
    if (Object.prototype.toString.call(reg) === '[object RegExp]' || typeof reg ===
      'string') {
      newdata = typeof replaceWord === 'string' ? data.replace(reg,
        replaceWord) : data.replace(reg, replaceWord[0]);
    } else {
      reg.map((eachItem, index) => {
        newdata = newdata.replace(eachItem, replaceWord[index]);
        return false;
      });
    }
    fs.writeFileSync(item, newdata);
  });
}
miniReplace('./demo',
  /https:\/\/unpkg.com\/bizcharts@3.0.3\/umd\/BizCharts.min.js/g,
  'https://unpkg.com/bizcharts@3.0.4/umd/BizCharts.min.js');
module.exports = miniReplace;

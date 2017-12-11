/**
* util function:
*  abc-xyz to abcXyz
*/
function camelize(str) {
  return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

/**
 * util function:
 *  format module name
 */
function formatModuleName(str) {
  return str.replace(/.js/g, '');
}

window.require = function (path) {
  var result = window;
  var namespaces = path.split('/');
  if (path[0] === '@') {
    namespaces = [namespaces.slice(0, 2).join('/')].concat(namespaces.slice(2));
    // ["@alife/next", "lib", "button"]
    // ["@alife/next", "lib", "button.scss"]
  }
  namespaces.forEach(function (key, i) {
    if (i === 2 && !key.match(/\.scss$/)) {
      key = camelize(key);
    }

    /**
     * 如果引入的模块以 .js 结尾，则忽略该结尾
     *  e.g. button.js ---> button
     */
    if (key.match(/\.js$/)) {
      key = formatModuleName(key);
    }

    /**
     * 忽略解析所有在DEMO中引入的 scss
     *  e.g. '@alife/next/lib/button.scss'
     */
    if (key !== 'lib' && !key.match(/scss$/)) {
      if (result[key]) {
        result = result[key];
      } else {
        throw 'There should not have modules here: ' + path;
      }
    }
  });
  return result;
};


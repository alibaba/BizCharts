// 只列举常用的函数，复杂的推荐使用第三方类库。
import _forIn from '@antv/util/lib/for-in';
import _groupBy from '@antv/util/lib/group-by';
import _isArray from '@antv/util/lib/is-array';

/**
 * 折叠数据
 * @param data 数据源
 * @param fields 被折叠的字段数组
 * @param foldCate 折叠的分类字段名
 * @param foldValue 折叠后的值字段名
 */
export default (data: any[], fields: string[], foldCate:string, foldValue: string) => {
  const resultRows = [];
  data.forEach((row) => {
    fields.forEach((field) => {
      resultRows.push({
        ...row,
        [foldCate]: field,
        [foldValue]: row[field],
      });
    });
  });
  return resultRows;
}

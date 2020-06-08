// from g2-dataSte
import isArray from '@antv/util/lib/is-array';
import isFunction from '@antv/util/lib/is-function';
import isString from '@antv/util/lib/is-string';

export type SortTarget = string | string[] | ((a: any, b: any) => number);

export default function sortBy(arr: any[], keys: SortTarget = []): any[] {
  let comparer: ((a: any, b: any) => number) | undefined;
  if (isFunction(keys)) {
    comparer = keys;
  } else if (isArray(keys)) {
    comparer = (a, b) => {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
      }
      return 0;
    };
  } else if (isString(keys)) {
    comparer = (a, b) => {
      if (a[keys] < b[keys]) {
        return -1;
      }
      if (a[keys] > b[keys]) {
        return 1;
      }
      return 0;
    };
  }
  return arr.sort(comparer);
}

import _each from '@antv/util/lib/each';
import _indexOf from '@antv/util/lib/index-of';


const pickWithout = (obj: Record<string, any>, keys:string[]) => {
  const ret: { [key: string]: any } = {};
  _each(obj, (v: any, k: string) => {
    if (_indexOf(keys, k) === -1) {
      ret[k] = v;
    }
  });
  return ret;
}

export default pickWithout;

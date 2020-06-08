import _clone from '@antv/util/lib/clone';

// g2 的配置项为 xxCfg | null
export default (cfg: Object, keys: string[]) => {
  const opt = _clone(cfg);
  keys.forEach(key => {
    if (opt[key] === true) {
      opt[key] = {};
    } else if (opt[key] === false) {
      opt[key] = null;
    }
  });
  return opt;
}

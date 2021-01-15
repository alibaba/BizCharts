import React from 'react';
import _isString from '@antv/util/lib/is-string';
import _isBoolean from '@antv/util/lib/is-boolean';
import _isObject from '@antv/util/lib/is-object';

// plot visible 写法的快速转换
export const visibleHelper = (cfg, defaultVisible: boolean = true) => {
  if (_isString(cfg) || React.isValidElement(cfg)) {
    return {
      visible: true,
      text: cfg,
    };
  }
  if (_isBoolean(cfg)) {
    return {
      visible: cfg,
    };
  }
  if (_isObject(cfg)) {
    return {
      visible: true,
      ...cfg,
    };
  }
  return {
    visible: defaultVisible,
  };
};

export const visibleHelperInvert = cfg => {
  // @ts-ignore
  if (_isObject(cfg) && cfg.visible !== false) {
    // @ts-ignore
    return cfg.text;
  }
  return cfg;
};

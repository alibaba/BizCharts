import Reconciler from 'react-reconciler';
import React from 'react';
import GroupContext from '../../context/group';

const emptyObject = {}

// 渲染的组件为封装组件，不需要渲染
const HostConfig = {
  getRootHostContext() {},
  getChildHostContext() {},
  createInstance() {}, // 不返回实例则不进入其他周期
  finalizeInitialChildren() {
    return false
  },
  hideTextInstance() {},
  getPublicInstance(instance: any) {
    return instance;
  },
  hideInstance() {},
  unhideInstance() {},
  createTextInstance() {},
  prepareUpdate() {
    return emptyObject;
  },
  shouldDeprioritizeSubtree() {
    return false
  },
  appendInitialChild() {},
  appendChildToContainer() {},
  removeChildFromContainer() {},
  prepareForCommit() {},
  resetAfterCommit() {},
  // 是否需要设置文字内容
  shouldSetTextContent() {
    return false;
  },
  supportsMutation: true, // it works by mutating nodes
  appendChild() {},
};

const Renderer = Reconciler(HostConfig);
const LegacyRoot = 0;

const withContext = (element, container) => {
  return (<GroupContext.Provider value={container}>
    <>{element}</>
  </GroupContext.Provider>)
}

const ReactG = {
  render(element, container) {
    if (container.clear) {
      container.clear();
    }
    const root = Renderer.createContainer(container, LegacyRoot, false);
    Renderer.updateContainer(withContext(element, container), root, null, () => undefined);
    return Renderer.getPublicRootInstance(root);
  }
};

export default ReactG;

import Reconciler from 'react-reconciler';
import React from 'react';
import GroupContext, { withGroupContext } from '../../context/group';
const emptyObject = {}

const HostConfig = {
  createInstance(type, props) {},
  getRootHostContext() {

  },
  hideTextInstance() {},
  getPublicInstance(instance: any) {
    return instance
  },
  hideInstance() {},
  commitUpdate() {
    console.log(12)
  },
  unhideInstance() {},
  getChildHostContext(nextRootInstance) {
    return nextRootInstance
  },
  createTextInstance() {},
  finalizeInitialChildren() {
    return false
  },
  prepareUpdate() {
    return emptyObject
  },
  shouldDeprioritizeSubtree() {
    return false
  },
  appendChildToContainer() {},
  removeChildFromContainer() {},
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false
  },
  // ...
  supportsMutation: true, // it works by mutating nodes
  appendChild(parent, child) {
    console.log(999)
  },
  // ...
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
    console.log(root);
    Renderer.updateContainer(withContext(element, container), root, null, () => undefined);
    return Renderer.getPublicRootInstance(root);
  }
};

export default ReactG;

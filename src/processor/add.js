import interfaceEs6 from 'interface-es6';
import { Util } from '../shared';

function mix(obj1, obj2) {
  if (!obj1 && !obj2) {
    return {};
  }
  if (!obj1) {
    return { ...obj2 };
  }
  if (!obj2) {
    return { ...obj1 };
  }
  return Util.mix(obj1, obj2);
}

const iAdd = interfaceEs6({
  getConfigContainer(vId) {
    let viewContainer = this.config;

    if (vId) {
      if (!this.config.views) {
        this.config.views = {};
      }
      viewContainer = this.config.views[vId];
      if (!viewContainer) {
        viewContainer = {};
        this.config.views[vId] = viewContainer;
      }
    }

    return viewContainer;
  },

  addUniqueElement(name, props, id, vId) {
    const configContainer = this.getConfigContainer(vId);

    if (configContainer[name]) {
      // error
    }
    configContainer[name] = { ...props };

    return id;
  },

  addChart(props, id) {
    return this.addUniqueElement('chart', props, id, null);
  },

  addView(props, id) {
    const configContainer = this.config;

    if (!configContainer.views) {
      configContainer.views = {};
    }
    configContainer.views[id] = mix(configContainer.views[id], props);

    return id;
  },

  addAxis(props, id, vId) {
    const configContainer = this.getConfigContainer(vId);

    if (!configContainer.axises) {
      configContainer.axises = {};
    }
    configContainer.axises[id] = { ...props };

    return id;
  },

  addCoord(props, id, vId) {
    return this.addUniqueElement('coord', props, id, vId);
  },

  addGeom(props, id, vId) {
    const configContainer = this.getConfigContainer(vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }

    configContainer.geoms[id] = mix(configContainer.geoms[id], props);

    return id;
  },

  addLabel(props, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }
    this.addGeom({ label: { ...props } }, parentInfo.id, vId);

    return id;
  },

  addTooltip(props, id, vId) {
    return this.addUniqueElement('tooltip', props, id, vId);
  },

  addFacet(props, id, vId) {
    return this.addUniqueElement('facet', props, id, vId);
  },

  addLegend(props, id, vId) {
    const configContainer = this.getConfigContainer(vId);

    if (!configContainer.legends) {
      configContainer.legends = {};
    }

    configContainer.legends[id] = { ...props };

    return id;
  },

  addGuide(props, id, vId) {
    return this.addUniqueElement('guide', props, id, vId);
  },

  addTypedGuide(name, props, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(vId);
    let guide = configContainer.guide;
    if (!guide) {
      this.addUniqueElement('guides', props, parentInfo.id, vId);
      guide = configContainer.guides;
    }
    if (!guide.elements) {
      guide.elements = {};
    }

    guide.elements[id] = { type: name, ...props };

    return id;
  },

  addGuideLine(props, id, vId, parentInfo) {
    this.addTypedGuide('line', props, id, vId, parentInfo);
  },

  addGuideImage(props, id, vId, parentInfo) {
    this.addTypedGuide('image', props, id, vId, parentInfo);
  },

  addGuideText(props, id, vId, parentInfo) {
    this.addTypedGuide('text', props, id, vId, parentInfo);
  },

  addGuideRegion(props, id, vId, parentInfo) {
    this.addTypedGuide('region', props, id, vId, parentInfo);
  },

  addGuideHtml(props, id, vId, parentInfo) {
    this.addTypedGuide('html', props, id, vId, parentInfo);
  },

  addGuideArc(props, id, vId, parentInfo) {
    this.addTypedGuide('arc', props, id, vId, parentInfo);
  },

});

export default iAdd;

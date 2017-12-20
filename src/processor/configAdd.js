import { Util } from '../shared';

const addFuncMap = {
  Chart: 'addChart',
  Coord: 'addCoord',
  Geom: 'addGeom',
  Axis: 'addAxis',
  Tooltip: 'addTooltip',
  Legend: 'addLegend',
  Label: 'addLabel',
  View: 'addView',
  Guide: 'addGuide',
  GuideLine: 'addGuideLine',
  GuideImage: 'addGuideImage',
  GuideText: 'addGuideText',
  GuideRegion: 'addGuideRegion',
  GuideHtml: 'addGuideHtml',
  GuideArc: 'addGuideArc',
  Facet: 'addFacet',
};

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

const iAdd = {
  addElement(name, config, props, id, viewId, parentInfo) {
    this[addFuncMap[name]](config, props, id, viewId, parentInfo);
  },

  getConfigContainer(viewContainer, vId) {
    if (vId) {
      if (!viewContainer.views) {
        viewContainer.views = {};
      }
      viewContainer = viewContainer.views[vId];
      if (!viewContainer) {
        viewContainer = {};
        viewContainer.views[vId] = viewContainer;
      }
    }

    return viewContainer;
  },

  addUniqueElement(config, name, props, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (configContainer[name]) {
      // error
    }
    configContainer[name] = { ...props };

    return id;
  },

  addChart(config, props, id) {
    return this.addUniqueElement(config, 'chart', props, id, null);
  },

  addView(configContainer, props, id) {
    if (!configContainer.views) {
      configContainer.views = {};
    }
    configContainer.views[id] = mix(configContainer.views[id], props);

    return id;
  },

  addAxis(config, props, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.axises) {
      configContainer.axises = {};
    }
    configContainer.axises[id] = { ...props };

    return id;
  },

  addCoord(config, props, id, vId) {
    return this.addUniqueElement(config, 'coord', props, id, vId);
  },

  addGeom(config, props, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }

    configContainer.geoms[id] = mix(configContainer.geoms[id], props);

    return id;
  },

  addLabel(config, props, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }
    this.addGeom(config, { label: { ...props } }, parentInfo.id, vId);

    return id;
  },

  addTooltip(config, props, id, vId) {
    return this.addUniqueElement(config, 'tooltip', props, id, vId);
  },

  addFacet(config, props, id, vId) {
    return this.addUniqueElement(config, 'facet', props, id, vId);
  },

  addLegend(config, props, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.legends) {
      configContainer.legends = {};
    }

    configContainer.legends[id] = { ...props };

    return id;
  },

  addGuide(config, props, id, vId) {
    return this.addUniqueElement(config, 'guide', props, id, vId);
  },

  addTypedGuide(config, name, props, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(config, vId);
    let guide = configContainer.guide;
    if (!guide) {
      this.addUniqueElement('guide', {}, parentInfo.id, vId);
      guide = configContainer.guide;
    }
    if (!guide.elements) {
      guide.elements = {};
    }

    guide.elements[id] = { type: name, ...props };

    return id;
  },

  addGuideLine(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'line', props, id, vId, parentInfo);
  },

  addGuideImage(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'image', props, id, vId, parentInfo);
  },

  addGuideText(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'text', props, id, vId, parentInfo);
  },

  addGuideRegion(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'region', props, id, vId, parentInfo);
  },

  addGuideHtml(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'html', props, id, vId, parentInfo);
  },

  addGuideArc(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'arc', props, id, vId, parentInfo);
  },

};

export default iAdd;

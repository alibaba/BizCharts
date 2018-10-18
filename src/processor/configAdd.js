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
  GuideRegionFilter: 'addGuideRegionFilter',
  GuideDataMarker: 'addGuideDataMarker',
  GuideDataRegion: 'addGuideDataRegion',
  Facet: 'addFacet',
};

const iAdd = {
  addElement(name, config, elemInfo) {
    this[addFuncMap[name]](config, elemInfo, elemInfo.id, elemInfo.viewId, elemInfo.parentInfo);
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

  addUniqueElement(config, name, elemInfo, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (configContainer[name]) {
      // error
    }
    configContainer[name] = elemInfo;

    return id;
  },

  addChart(config, elemInfo, id) {
    return this.addUniqueElement(config, 'chart', elemInfo, id, null);
  },

  addView(configContainer, elemInfo, id) {
    if (!configContainer.views) {
      configContainer.views = {};
    }
    configContainer.views[id] = elemInfo;

    return id;
  },

  addAxis(config, elemInfo, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.axises) {
      configContainer.axises = {};
    }
    configContainer.axises[id] = elemInfo;

    return id;
  },

  addCoord(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'coord', elemInfo, id, vId);
  },

  addGeom(config, elemInfo, id, vId, isLabel) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }

    if (configContainer.geoms[id]) {
      if (isLabel) {
        configContainer.geoms[id].label = elemInfo.label;
      } else {
        if (!configContainer.geoms[id].label) {
          console.log('geom label error');
        }
        elemInfo.label = configContainer.geoms[id].label;
        configContainer.geoms[id] = elemInfo;
      }
    } else {
      configContainer.geoms[id] = elemInfo;
    }

    return id;
  },

  addLabel(config, elemInfo, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }
    this.addGeom(config, { label: elemInfo }, parentInfo.id, vId, true);

    return id;
  },

  addTooltip(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'tooltip', elemInfo, id, vId);
  },

  addFacet(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'facet', elemInfo, id, vId);
  },

  addLegend(config, elemInfo, id, vId) {
    const configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.legends) {
      configContainer.legends = {};
    }

    configContainer.legends[id] = elemInfo;

    return id;
  },

  addGuide(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'guide', elemInfo, id, vId);
  },

  addTypedGuide(config, name, elemInfo, id, vId, parentInfo) {
    const configContainer = this.getConfigContainer(config, vId);
    let guide = configContainer.guide;
    if (!guide) {
      this.addUniqueElement('guide', {}, parentInfo.id, vId);
      guide = configContainer.guide;
    }
    if (!guide.elements) {
      guide.elements = {};
    }

    elemInfo.type = name;
    guide.elements[id] = elemInfo;

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

  addGuideRegionFilter(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'regionFilter', props, id, vId, parentInfo);
  },

  addGuideDataMarker(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'dataMarker', props, id, vId, parentInfo);
  },

  addGuideDataRegion(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'dataRegion', props, id, vId, parentInfo);
  },

};

export default iAdd;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addFuncMap = {
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
  Facet: 'addFacet'
};

var iAdd = {
  addElement: function addElement(name, config, elemInfo) {
    this[addFuncMap[name]](config, elemInfo, elemInfo.id, elemInfo.viewId, elemInfo.parentInfo);
  },
  getConfigContainer: function getConfigContainer(viewContainer, vId) {
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
  addUniqueElement: function addUniqueElement(config, name, elemInfo, id, vId) {
    var configContainer = this.getConfigContainer(config, vId);

    if (configContainer[name]) {
      // error
    }
    configContainer[name] = elemInfo;

    return id;
  },
  addChart: function addChart(config, elemInfo, id) {
    return this.addUniqueElement(config, 'chart', elemInfo, id, null);
  },
  addView: function addView(configContainer, elemInfo, id) {
    if (!configContainer.views) {
      configContainer.views = {};
    }
    configContainer.views[id] = elemInfo;

    return id;
  },
  addAxis: function addAxis(config, elemInfo, id, vId) {
    var configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.axises) {
      configContainer.axises = {};
    }
    configContainer.axises[id] = elemInfo;

    return id;
  },
  addCoord: function addCoord(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'coord', elemInfo, id, vId);
  },
  addGeom: function addGeom(config, elemInfo, id, vId, isLabel) {
    var configContainer = this.getConfigContainer(config, vId);

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
  addLabel: function addLabel(config, elemInfo, id, vId, parentInfo) {
    var configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.geoms) {
      configContainer.geoms = {};
    }
    this.addGeom(config, { label: elemInfo }, parentInfo.id, vId, true);

    return id;
  },
  addTooltip: function addTooltip(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'tooltip', elemInfo, id, vId);
  },
  addFacet: function addFacet(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'facet', elemInfo, id, vId);
  },
  addLegend: function addLegend(config, elemInfo, id, vId) {
    var configContainer = this.getConfigContainer(config, vId);

    if (!configContainer.legends) {
      configContainer.legends = {};
    }

    configContainer.legends[id] = elemInfo;

    return id;
  },
  addGuide: function addGuide(config, elemInfo, id, vId) {
    return this.addUniqueElement(config, 'guide', elemInfo, id, vId);
  },
  addTypedGuide: function addTypedGuide(config, name, elemInfo, id, vId, parentInfo) {
    var configContainer = this.getConfigContainer(config, vId);
    var guide = configContainer.guide;
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
  addGuideLine: function addGuideLine(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'line', props, id, vId, parentInfo);
  },
  addGuideImage: function addGuideImage(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'image', props, id, vId, parentInfo);
  },
  addGuideText: function addGuideText(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'text', props, id, vId, parentInfo);
  },
  addGuideRegion: function addGuideRegion(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'region', props, id, vId, parentInfo);
  },
  addGuideHtml: function addGuideHtml(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'html', props, id, vId, parentInfo);
  },
  addGuideArc: function addGuideArc(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'arc', props, id, vId, parentInfo);
  },
  addGuideRegionFilter: function addGuideRegionFilter(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'regionFilter', props, id, vId, parentInfo);
  },
  addGuideDataMarker: function addGuideDataMarker(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'dataMarker', props, id, vId, parentInfo);
  },
  addGuideDataRegion: function addGuideDataRegion(config, props, id, vId, parentInfo) {
    this.addTypedGuide(config, 'dataRegion', props, id, vId, parentInfo);
  }
};

exports.default = iAdd;
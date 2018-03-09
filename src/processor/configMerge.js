
const deleteFuncMap = {
  Chart: 'deleteChart',
  Coord: 'deleteCoord',
  Geom: 'deleteGeom',
  Axis: 'deleteAxis',
  Tooltip: 'deleteTooltip',
  Legend: 'deleteLegend',
  Label: 'deleteLabel',
  View: 'deleteView',
  Guide: 'deleteGuide',
  GuideLine: 'deleteTypedGuide',
  GuideImage: 'deleteTypedGuide',
  GuideText: 'deleteTypedGuide',
  GuideRegion: 'deleteTypedGuide',
  GuideHtml: 'deleteTypedGuide',
  GuideArc: 'deleteTypedGuide',
  Facet: 'deleteFacet',
};

const iMerge = {
  merge(config, deleteInfos, elementInfos, clear) {
    this.mergeDelete(config, deleteInfos, elementInfos);
    this.mergeUpdate(config, clear);
  },

  mergeDelete(config, deleteInfos, elementInfos) {
    Object.keys(deleteInfos).forEach((id) => {
      const funName = deleteFuncMap[elementInfos[id].name];
      let deleteConfigContainer = config;
      if (elementInfos[id].viewId) {
        deleteConfigContainer = config.views[elementInfos[id].viewId];
      }
      if (this[funName]) {
        this[funName](deleteConfigContainer, id, elementInfos[id].parentInfo.id);
      }
    });
  },

  deleteAxis(config, id) {
    if (!config) return;
    delete config.axises[id];
  },

  deleteTooltip(config) {
    if (!config) return;
    delete config.tooltip;
  },

  deleteCoord(config) {
    if (!config) return;
    delete config.coord;
  },

  deleteLegend(config, id) {
    if (!config) return;
    delete config.legends[id];
  },

  deleteGuide(config) {
    if (!config) return;
    delete config.guide;
  },

  deleteGeom(config, id) {
    if (!config || !config.geoms) return;

    delete config.geoms[id];
  },

  deleteLabel(config, id, parentId) {
    if (!config || !config.geoms || !config.geoms[parentId]) return;

    delete config.geoms[parentId].label;
  },

  deleteFacet(config) {
    if (!config) return;

    delete config.facet;
  },

  deleteTypedGuide(config, id) {
    if (!config || !config.guide) return;
    delete config.guide.elements[id];
  },

  deleteView(config, id) {
    if (!config) return;
    delete config.views[id];
  },

  mergeUpdate(config, clear) {
    this.mergeChart(config, clear);
    this.mergeAxises(config, clear);
    this.mergeCoord(config, clear);
    this.mergeGeoms(config.geoms, clear);
    this.mergeLegends(config.legends, clear);
    this.mergeTooltip(config, clear);
    this.mergeViews(config.views, clear);
  },

  mergeChart(config, clear) {
    if (config.chart && config.chart.updateProps) {
      config.chart.props = config.chart.updateProps;
    }
    if (clear) {
      delete config.chart.g2Instance;
    }
  },

  mergeAxises(config, clear) {
    const axises = config.axises;

    if (!axises == null) {
      return;
    }

    for (const id in axises) {
      if (axises[id] && axises[id].updateProps) {
        axises[id].props = axises[id].updateProps;
      }
      if (clear) {
        delete axises[id].g2Instance;
      }
    }

    return;
  },

  mergeTooltip(config, clear) {
    if (!config.tooltip) return;
    if (clear) {
      delete config.tooltip.g2Instance;
    }

    if (config.tooltip.updateProps) {
      config.tooltip.props = config.tooltip.updateProps;
    }
  },

  mergeCoord(config, clear) {
    if (!config.coord) return;
    if (clear) delete config.coord.g2Instance;
    if (config.coord.updateProps) {
      config.coord.props = config.coord.updateProps;
    }
  },

  mergeLegends(legends, clear) {
    if (!legends) return;

    for (const id in legends) {
      if (legends[id]) {
        const legendConfig = legends[id];
        if (clear) {
          delete legendConfig.g2Instance;
        }
        if (legendConfig.updateProps) legendConfig.props = legendConfig.updateProps;
      }
    }
  },

  mergeGeoms(geoms, clear) {
    if (geoms == null) return;

    for (const id in geoms) {
      if (geoms[id]) {
        if (clear) {
          delete geoms[id].g2Instance;
          if (geoms[id].label && geoms[id].label.g2Instance) {
            delete geoms[id].label.g2Instance;
          }
        }
        if (geoms[id].updateProps) geoms[id].props = geoms[id].updateProps;
      }
    }
  },

  mergeGuide(guide, clear) {
    if (guide == null) return;

    const guides = guide.elements;
    for (const id in guides) {
      if (guides[id]) {
        if (clear) {
          delete guides[id].g2Instance;
        }
        if (guides[id].updateProps) {
          guides[id].props = guides[id].updateProps;
        }
      }
    }
  },

  mergeView(view, clear) {
    if (!view) return;
    // merge self
    if (clear && view.g2Instance) {
      delete view.g2Instance;
    }
    if (view.updateProps) {
      view.props = view.updateProps;
    }

    this.mergeCoord(view, clear);
    this.mergeAxises(view, clear);
    this.mergeGeoms(view.geoms, clear);
    this.mergeGuide(view.guide, clear);
  },

  mergeViews(views, clear) {
    if (views == null) return;

    for (const id in views) {
      if (views[id]) {
        this.mergeView(views[id], clear);
      }
    }
  },

};

export default iMerge;

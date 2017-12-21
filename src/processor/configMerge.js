
import { Util } from '../shared';

const notViewSelfProps = ['axises', 'coord', 'geoms', 'guide', 'children'];

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
  merge(config, nextConfig, deleteInfos, elementInfos, clear) {
    this.mergeDelete(config, deleteInfos, elementInfos);
    this.mergeUpdate(config, nextConfig, clear);
  },

  mergeDelete(config, deleteInfos, elementInfos) {
    Object.keys(deleteInfos).forEach((id) => {
      const funName = deleteFuncMap[elementInfos[id].name];
      let deleteConfigContainer = config;
      if (elementInfos[id].viewId) {
        deleteConfigContainer = config.views[elementInfos[id].viewId];
      }
      if (this[funName]) {
        this[funName](deleteConfigContainer, id);
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

  deleteTypedGuide(config, id) {
    if (!config || !config.guide) return;
    delete config.guide.elements[id];
  },

  deleteView(config, id) {
    if (!config) return;
    delete config.views[id];
  },

  deleteFacet(config) {
    if (!config) return;
    delete config.facet;
  },

  mergeUpdate(config, nextConfig, clear) {
    this.mergeChart(config, nextConfig, clear);
    this.mergeAxises(config, nextConfig, clear);
    this.mergeCoord(config, nextConfig, clear);
    this.mergeGeoms(config.geoms, nextConfig.geoms, clear);
    this.mergeLegends(config.legends, nextConfig.legends, clear);
    this.mergeTooltip(config, nextConfig, clear);
    this.mergeViews(config.views, nextConfig.views, clear);
  },

  mergeChart(config, nextConfig, clear) {
    if (nextConfig.chart) {
      if (!clear) {
        nextConfig.chart.g2Instance = config.chart.g2Instance;
      }
      config.chart = nextConfig.chart;
    } else if (clear) {
      delete config.chart.g2Instance;
    }
  },

  mergeAxises(config, nextConfig, clear) {
    const axises = config.axises;
    const nextAxises = nextConfig.axises;

    if (axises == null || nextAxises == null) {
      return;
    }

    for (const id in axises) {
      if (nextAxises[id]) {
        if (!clear) {
          nextAxises[id].g2Instance = axises[id].g2Instance;
        }
        axises[id] = nextAxises[id];
      } else if (clear) {
        delete axises[id].g2Instance;
      }
    }

    return;
  },

  mergeTooltip(config, nextConfig, clear) {
    if (config.tooltip && nextConfig.tooltip) {
      if (!clear) {
        nextConfig.tooltip.g2Instance = config.tooltip.g2Instance;
      }
      config.tooltip = nextConfig.tooltip;
    } else if (config.tooltip && clear) {
      delete config.tooltip.g2Instance;
    }
  },

  mergeCoord(config, nextConfig, clear) {
    if (config.coord && nextConfig.coord) {
      if (!clear) {
        nextConfig.coord.g2Instance = config.coord.g2Instance;
      }
      config.coord = nextConfig.coord;
    } else if (config.coord && clear) {
      delete config.coord.g2Instance;
    }
  },

  mergeLegends(legends, nextLegends, clear) {
    if (!legends) return;

    for (const id in legends) {
      if (nextLegends && nextLegends[id]) {
        if (!clear) {
          nextLegends[id].g2Instance = legends[id].g2Instance;
        }
        legends[id] = nextLegends[id];
      } else if (clear) {
        delete legends[id].g2Instance;
      }
    }
  },

  mergeGeoms(geoms, nextGeoms, clear) {
    if (geoms == null) return;

    for (const id in geoms) {
      if (nextGeoms && nextGeoms[id]) {
        if (!clear) {
          nextGeoms[id].g2Instance = geoms[id].g2Instance;
        }
        geoms[id] = nextGeoms[id];
      } else if (clear) {
        delete geoms[id].g2Instance;
      }
    }
  },

  mergeGuide(guide, nextGuide, clear) {
    if (guide == null || nextGuide == null) return;

    const guides = guide.elements;
    let nextGuides = nextGuide.elements;
    if (nextGuides == null) nextGuides = {};
    for (const id in guides) {
      if (nextGuides[id]) {
        if (clear) {
          guides[id] = nextGuides[id];
        } else {
          nextGuides[id].g2Instance = guides[id].g2Instance;
        }
      } else if (clear) {
        delete guides[id].g2Instance;
      }
    }
  },

  mergeView(view, nextView, clear) {
    // merge self
    const nextViewProps = Util.without(nextView, notViewSelfProps);

    Util.mix(view, nextViewProps);

    this.mergeCoord(view, nextView, clear);
    this.mergeAxises(view, nextView, clear);
    this.mergeGeoms(view.geoms, nextView.geoms, clear);
    this.mergeGuide(view.guide, nextView.guide, clear);
    if (clear) {
      delete view.g2Instance;
    }
  },

  mergeViews(views, nextViews, clear) {
    if (views == null) return;

    for (const id in views) {
      if (nextViews && nextViews[id]) {
        this.mergeView(views[id], nextViews[id], clear);
      } else if (clear) {
        delete views[id].g2Instance;
      }
    }
  },

};

export default iMerge;

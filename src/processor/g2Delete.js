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

const reExecuteDeleteElements = {
  Geom: true,
  Label: true,
  Facet: true,
};

const iDelete = {
  deleteAxis(chart, config, id) {
    const axisConfig = config.axises[id].props;
    chart.axis(axisConfig.name, false);
  },

  deleteTooltip(chart) {
    chart.tooltip(false);
  },

  deleteCoord(chart) {
    chart.coord('rect', {});
  },

  deleteLegend(chart, config, id) {
    const legendConfig = config.legends[id].props;
    chart.legend(...(legendConfig.name ? [legendConfig.name, false] : [false]));
  },

  deleteGuide(chart) {
    chart.guide().clear();
  },

  deleteView(chart, config, id) {
    if (!config.views[id].g2Instance) return;
    chart.removeView(config.views[id].g2Instance);
    delete config.views[id].g2Instance;
  },

  deleteViewElement(chart, config, deleteInfos, elementInfos) {
    // 次模块只处理元素的删除，将删除同步到 g2。
    // 因此此处只需要将view destory 掉，如果需要则重建。
    Object.keys(deleteInfos).forEach((id) => {
      const elementInfo = elementInfos[id];
      const viewId = elementInfo.viewId;
      if (viewId) {
        if (reExecuteDeleteElements[elementInfo.name]) {
          config.views[viewId].needReExecute = true;
        } else if (config.views[viewId].g2Instance && this[deleteFuncMap[elementInfo.name]]) {
          this[deleteFuncMap[elementInfo.name]](
            config.views[viewId].g2Instance,
            config.views[viewId],
            elementInfo.id,
          );
        }
      }
    });
  },

  needReExecute(deleteInfos, elementInfos) {
    for (const id in deleteInfos) {
      if (reExecuteDeleteElements[elementInfos[id].name] && !elementInfos[id].viewId) {
        return true;
      }
    }
    return false;
    // return Object.keys(deleteInfos).find((id) => {
    //   return reExecuteDeleteElements[elementInfos[id].name] && !elementInfos[id].viewId;
    // });
  },

  synchronizeG2Delete(chart, config, deleteInfos, elementInfos) {
    Object.keys(deleteInfos).forEach((id) => {
      const funName = deleteFuncMap[elementInfos[id].name];
      if (this[funName] && !elementInfos[id].viewId) {
        this[funName](chart, config, id);
      }
    });

    this.deleteViewElement(chart, config, deleteInfos, elementInfos);
  },
};

export default iDelete;

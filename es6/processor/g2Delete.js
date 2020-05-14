'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deleteFuncMap = {
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
  Facet: 'deleteFacet'
};

var reExecuteDeleteElements = {
  Geom: true,
  Label: true,
  Facet: true
};

var iDelete = {
  deleteAxis: function deleteAxis(chart, config, id) {
    var axisConfig = config.axises[id].props;
    chart.axis(axisConfig.name, false);
  },
  deleteTooltip: function deleteTooltip(chart) {
    chart.tooltip(false);
  },
  deleteCoord: function deleteCoord(chart) {
    chart.coord('rect', {});
  },
  deleteLegend: function deleteLegend(chart, config, id) {
    var legendConfig = config.legends[id].props;
    chart.legend.apply(chart, _toConsumableArray(legendConfig.name ? [legendConfig.name, false] : [false]));
  },
  deleteGuide: function deleteGuide(chart) {
    chart.guide().clear();
  },
  deleteView: function deleteView(chart, config, id) {
    if (!config.views[id].g2Instance) return;
    chart.removeView(config.views[id].g2Instance);
    delete config.views[id].g2Instance;
  },
  deleteViewElement: function deleteViewElement(chart, config, deleteInfos, elementInfos) {
    var _this = this;

    // 次模块只处理元素的删除，将删除同步到 g2。
    // 因此此处只需要将view destory 掉，如果需要则重建。
    Object.keys(deleteInfos).forEach(function (id) {
      var elementInfo = elementInfos[id];
      var viewId = elementInfo.viewId;
      if (viewId) {
        if (reExecuteDeleteElements[elementInfo.name]) {
          config.views[viewId].needReExecute = true;
        } else if (config.views[viewId].g2Instance && _this[deleteFuncMap[elementInfo.name]]) {
          _this[deleteFuncMap[elementInfo.name]](config.views[viewId].g2Instance, config.views[viewId], elementInfo.id);
        }
      }
    });
  },
  needReExecute: function needReExecute(deleteInfos, elementInfos) {
    for (var id in deleteInfos) {
      if (reExecuteDeleteElements[elementInfos[id].name] && !elementInfos[id].viewId) {
        return true;
      }
    }
    return false;
    // return Object.keys(deleteInfos).find((id) => {
    //   return reExecuteDeleteElements[elementInfos[id].name] && !elementInfos[id].viewId;
    // });
  },
  synchronizeG2Delete: function synchronizeG2Delete(chart, config, deleteInfos, elementInfos) {
    var _this2 = this;

    Object.keys(deleteInfos).forEach(function (id) {
      var funName = deleteFuncMap[elementInfos[id].name];
      if (_this2[funName] && !elementInfos[id].viewId) {
        _this2[funName](chart, config, id);
      }
    });

    this.deleteViewElement(chart, config, deleteInfos, elementInfos);
  }
};

exports.default = iDelete;
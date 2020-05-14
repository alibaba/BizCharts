'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configAdd = require('./configAdd');

var _configAdd2 = _interopRequireDefault(_configAdd);

var _configMerge = require('./configMerge');

var _configMerge2 = _interopRequireDefault(_configMerge);

var _g2Update = require('./g2Update');

var _g2Update2 = _interopRequireDefault(_g2Update);

var _g2Delete = require('./g2Delete');

var _g2Delete2 = _interopRequireDefault(_g2Delete);

var _g2Creator = require('./g2Creator');

var _g2Creator2 = _interopRequireDefault(_g2Creator);

var _shared = require('../shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function () {
  function Processor() {
    _classCallCheck(this, Processor);

    this.config = {};
    this.elementInfos = {};
    this.added = false;
    this.initedG2 = false;
    this.updated = false;
    this.deleted = false;
    this.deleteInfos = {};
  }

  _createClass(Processor, [{
    key: 'calUpdateFlag',
    value: function calUpdateFlag(name, id) {
      /* eslint-disable  no-unused-vars */
      var _elementInfos$id$prop = this.elementInfos[id].props,
          children = _elementInfos$id$prop.children,
          props = _objectWithoutProperties(_elementInfos$id$prop, ['children']);

      var _elementInfos$id$upda = this.elementInfos[id].updateProps,
          nextChildren = _elementInfos$id$upda.children,
          nextProps = _objectWithoutProperties(_elementInfos$id$upda, ['children']);
      /* eslint-enable */


      if (name === 'Chart' || name === 'View') {
        var data = props.data,
            otherProps = _objectWithoutProperties(props, ['data']);

        var nextData = nextProps.data,
            nextOtherProps = _objectWithoutProperties(nextProps, ['data']);

        if (data !== nextData || !_shared.Util.isEqual(otherProps, nextOtherProps)) {
          this.updated = true;
        }
      } else if (!_shared.Util.isEqual(props, nextProps)) {
        this.updated = true;
      }
    }
  }, {
    key: 'addElement',
    value: function addElement(name, id, props, parentInfo, viewId) {
      if (!this.chart && this.initedG2) return;
      this.added = true;
      this.elementInfos[id] = {
        id: id,
        viewId: viewId,
        parentInfo: parentInfo,
        name: name,
        props: _extends({}, props)
      };
      if (parentInfo && !this.elementInfos[parentInfo.id]) {
        this.elementInfos[parentInfo.id] = {
          id: parentInfo.id,
          name: parentInfo.name
        };
      }

      _configAdd2.default.addElement(name, this.config, this.elementInfos[id]);
    }
  }, {
    key: 'updateElement',
    value: function updateElement(name, id, props) {
      this.elementInfos[id].updateProps = _extends({}, props);
      this.calUpdateFlag(name, id);
    }
  }, {
    key: 'deleteElement',
    value: function deleteElement(name, id) {
      if (!this.chart) return;

      this.deleteInfos[id] = id;
      this.deleted = true;
    }
  }, {
    key: 'createG2Instance',
    value: function createG2Instance() {
      var config = this.config;

      var chart = _g2Creator2.default.createChart(config, this.elementInfos);
      _g2Creator2.default.executeChartConfig(chart, config, this.elementInfos);
      _g2Creator2.default.synchronizeG2Add(chart, config, this.elementInfos);

      chart.render();

      this.chart = chart;
      this.initedG2 = true;
      this.resetStates();
      return chart;
    }
  }, {
    key: 'destory',
    value: function destory() {
      this.chart.destroy();
      this.chart = null;
    }
  }, {
    key: 'resetStates',
    value: function resetStates() {
      var elems = this.elementInfos;
      // eslint-disable-next-line guard-for-in
      for (var id in elems) {
        if (elems[id].updateProps) delete elems[id].updateProps;
        if (this.deleteInfos[id]) {
          delete elems[id];
        }
      }
      this.added = false;
      this.updated = false;
      this.deleteInfos = {};
    }
  }, {
    key: 'reExecuteChart',
    value: function reExecuteChart() {
      this.chart.clear();
      _configMerge2.default.merge(this.config, this.deleteInfos, this.elementInfos, true);
      _g2Creator2.default.executeChartConfig(this.chart, this.config, this.elementInfos);
      _g2Creator2.default.synchronizeG2Add(this.chart, this.config, this.elementInfos);
      this.chart.repaint();
      this.resetStates();
      return this.chart;
    }
  }, {
    key: 'batchedUpdate',
    value: function batchedUpdate() {
      if (this.chart == null) return null;
      if (this.config.chart.props.forceUpdate || _g2Update2.default.needRebuildChart(this.config)) {
        _configMerge2.default.merge(this.config, this.deleteInfos, this.elementInfos, true);
        this.chart.destroy();
        this.chart = 'destroy';
        return this.createG2Instance();
      }
      if (_g2Delete2.default.needReExecute(this.deleteInfos, this.elementInfos) || _g2Update2.default.needReExecute(this.config)) {
        this.reExecuteChart();
        return this.chart;
      }

      if (this.deleted) {
        _g2Delete2.default.synchronizeG2Delete(this.chart, this.config, this.deleteInfos, this.elementInfos);
        _configMerge2.default.mergeDelete(this.config, this.deleteInfos, this.elementInfos);
      }

      if (this.added) {
        _g2Creator2.default.synchronizeG2Add(this.chart, this.config);
      }
      if (this.updated) {
        _g2Update2.default.synchronizeG2Update(this.chart, this.config);
      }
      // if (g2Update.needRepaint(this.config) && (this.added || this.deleted || this.updated)) {
      if (this.added || this.deleted || this.updated) {
        this.chart.repaint();
      }

      _configMerge2.default.mergeUpdate(this.config, false);
      this.resetStates();

      return this.chart;
    }
  }]);

  return Processor;
}();

exports.default = Processor;
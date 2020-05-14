'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Guide = _Base2.default.generateBaseTypedComponent('Guide'); /*
                                                                Components:
                                                                  Guide
                                                                  Guide.Line
                                                                  Guide.Image
                                                                  Guide.Text
                                                                  Guide.Region
                                                                  Guide.Arc
                                                                  Guide.Html
                                                                  Guide.RegionFilter
                                                                  Guide.DataMarker
                                                                  Guide.DataRegion
                                                                */


Guide.Line = _Base2.default.generateBaseTypedComponent('GuideLine');
Guide.Image = _Base2.default.generateBaseTypedComponent('GuideImage');
Guide.Text = _Base2.default.generateBaseTypedComponent('GuideText');
Guide.Region = _Base2.default.generateBaseTypedComponent('GuideRegion');
Guide.Html = _Base2.default.generateBaseTypedComponent('GuideHtml');
Guide.Arc = _Base2.default.generateBaseTypedComponent('GuideArc');
Guide.RegionFilter = _Base2.default.generateBaseTypedComponent('GuideRegionFilter');
Guide.DataMarker = _Base2.default.generateBaseTypedComponent('GuideDataMarker');
Guide.DataRegion = _Base2.default.generateBaseTypedComponent('GuideDataRegion');

exports.default = Guide;
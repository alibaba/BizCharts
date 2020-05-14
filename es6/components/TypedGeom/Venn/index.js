'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('@antv/g2/lib/geom/venn');

var _generateTypedGeom = require('../generateTypedGeom');

var _generateTypedGeom2 = _interopRequireDefault(_generateTypedGeom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Line geometry Component
 */
exports.default = (0, _generateTypedGeom2.default)('Geom', 'venn');
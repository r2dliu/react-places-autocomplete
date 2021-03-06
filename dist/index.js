'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geocodeByAddress = undefined;

var _PlacesAutocomplete = require('./PlacesAutocomplete');

var _PlacesAutocomplete2 = _interopRequireDefault(_PlacesAutocomplete);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.geocodeByAddress = _utils.geocodeByAddress;
exports.default = _PlacesAutocomplete2.default;
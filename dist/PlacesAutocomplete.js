'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyles = {
  root: {
    position: 'relative',
    paddingBottom: '0px'
  },
  autocompleteOverlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9998
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    border: '1px solid #555',
    width: '100%',
    zIndex: 9999
  },
  autocompleteItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    color: '#555',
    cursor: 'pointer'
  },
  autocompleteItemActive: {
    backgroundColor: '#fafafa'
  }
};

var PlacesAutocomplete = function (_React$Component) {
  _inherits(PlacesAutocomplete, _React$Component);

  function PlacesAutocomplete(props) {
    _classCallCheck(this, PlacesAutocomplete);

    var _this = _possibleConstructorReturn(this, (PlacesAutocomplete.__proto__ || Object.getPrototypeOf(PlacesAutocomplete)).call(this, props));

    _this.state = { autocompleteItems: [] };

    _this.autocompleteCallback = _this.autocompleteCallback.bind(_this);
    _this.handleInputKeyDown = _this.handleInputKeyDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(PlacesAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initAutoComplete();
    }
  }, {
    key: 'initAutoComplete',
    value: function initAutoComplete() {
      if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && google.maps && google.maps.places && google.maps.places.AutocompleteService) {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
      } else {
        setTimeout(this.initAutoComplete.bind(this), 200);
      }
    }
  }, {
    key: 'autocompleteCallback',
    value: function autocompleteCallback(predictions, status) {
      if (status != this.autocompleteOK) {
        // TODO Actually handle errors
        this.setState({
          autocompleteItems: []
        });
        return;
      }
      this.setState({
        autocompleteItems: predictions.map(function (p, idx) {
          return {
            suggestion: p.description,
            placeId: p.place_id,
            active: false,
            index: idx
          };
        })
      });
    }
  }, {
    key: 'clearAutocomplete',
    value: function clearAutocomplete() {
      this.setState({ autocompleteItems: [] });
    }
  }, {
    key: 'selectAddress',
    value: function selectAddress(address) {
      this.clearAutocomplete();
      this._handleSelect(address);
    }
  }, {
    key: '_handleSelect',
    value: function _handleSelect(address) {
      this.props.onSelect ? this.props.onSelect(address) : this.props.onChange(address);
    }
  }, {
    key: '_getActiveItem',
    value: function _getActiveItem() {
      return this.state.autocompleteItems.find(function (item) {
        return item.active;
      });
    }
  }, {
    key: '_selectActiveItemAtIndex',
    value: function _selectActiveItemAtIndex(index) {
      var activeName = this.state.autocompleteItems.find(function (item) {
        return item.index === index;
      }).suggestion;
      this._setActiveItemAtIndex(index);
      this.props.onChange(activeName);
    }
  }, {
    key: '_handleEnterKey',
    value: function _handleEnterKey() {
      var activeItem = this._getActiveItem();
      if (activeItem === undefined) {
        return;
      }

      this.clearAutocomplete();
      this._handleSelect(activeItem.suggestion);
    }
  }, {
    key: '_handleDownKey',
    value: function _handleDownKey() {
      var activeItem = this._getActiveItem();
      if (activeItem === undefined) {
        this._selectActiveItemAtIndex(0);
      } else {
        var nextIndex = (activeItem.index + 1) % this.state.autocompleteItems.length;
        this._selectActiveItemAtIndex(nextIndex);
      }
    }
  }, {
    key: '_handleUpKey',
    value: function _handleUpKey() {
      var activeItem = this._getActiveItem();
      if (activeItem === undefined) {
        this._selectActiveItemAtIndex(this.state.autocompleteItems.length - 1);
      } else {
        var prevIndex = void 0;
        if (activeItem.index === 0) {
          prevIndex = this.state.autocompleteItems.length - 1;
        } else {
          prevIndex = (activeItem.index - 1) % this.state.autocompleteItems.length;
        }
        this._selectActiveItemAtIndex(prevIndex);
      }
    }
  }, {
    key: 'handleInputKeyDown',
    value: function handleInputKeyDown(event) {
      var ARROW_UP = 38;
      var ARROW_DOWN = 40;
      var ENTER_KEY = 13;

      switch (event.keyCode) {
        case ENTER_KEY:
          if (this.state.autocompleteItems && this.state.autocompleteItems.length) {
            event.preventDefault();
          }
          this._handleEnterKey();
          break;
        case ARROW_DOWN:
          this._handleDownKey();
          break;
        case ARROW_UP:
          this._handleUpKey();
          break;
      }

      if (typeof this.props.onKeyDown === 'function') {
        this.props.onKeyDown(event);
      }
    }
  }, {
    key: '_setActiveItemAtIndex',
    value: function _setActiveItemAtIndex(index) {
      this.setState({
        autocompleteItems: this.state.autocompleteItems.map(function (item, idx) {
          if (idx === index) {
            return _extends({}, item, { active: true });
          } else {
            return _extends({}, item, { active: false });
          }
        })
      });
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      this.props.onChange(event.target.value);
      if (!event.target.value) {
        this.clearAutocomplete();
        return;
      }
      this.autocompleteService.getPlacePredictions(_extends({}, this.props.options, { input: event.target.value }), this.autocompleteCallback);
    }
  }, {
    key: 'autocompleteItemStyle',
    value: function autocompleteItemStyle(active) {
      if (active) {
        return _extends({}, defaultStyles.autocompleteItemActive, this.props.styles.autocompleteItemActive);
      } else {
        return {};
      }
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (this.props.hideLabel) {
        return null;
      }
      return _react2.default.createElement(
        'label',
        { style: this.props.styles.label, className: this.props.classNames.label || '' },
        'Location'
      );
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      var _this2 = this;

      if (this.state.autocompleteItems.length === 0) {
        return null;
      }
      return _react2.default.createElement('div', {
        className: 'PlacesAutocomplete__overlay',
        style: defaultStyles.autocompleteOverlay,
        onClick: function onClick() {
          return _this2.clearAutocomplete();
        } });
    }
  }, {
    key: 'renderAutocomplete',
    value: function renderAutocomplete() {
      var _this3 = this;

      var autocompleteItems = this.state.autocompleteItems;
      var styles = this.props.styles;

      if (autocompleteItems.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          id: 'PlacesAutocomplete__autocomplete-container',
          className: this.props.classNames.autocompleteContainer || '',
          style: _extends({}, defaultStyles.autocompleteContainer, styles.autocompleteContainer) },
        autocompleteItems.map(function (p, idx) {
          return _react2.default.createElement(
            'div',
            {
              key: p.placeId,
              onMouseOver: function onMouseOver() {
                return _this3._setActiveItemAtIndex(p.index);
              },
              onClick: function onClick() {
                return _this3.selectAddress(p.suggestion);
              },
              style: _extends({}, defaultStyles.autocompleteItem, styles.autocompleteItem, _this3.autocompleteItemStyle(p.active)) },
            _this3.props.autocompleteItem({ suggestion: p.suggestion })
          );
        })
      );
    }
  }, {
    key: 'renderCustomInput',
    value: function renderCustomInput() {
      var _props = this.props,
          children = _props.children,
          autoFocus = _props.autoFocus,
          value = _props.value;

      return _react2.default.cloneElement(children, {
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown,
        autoFocus: autoFocus,
        value: value
      });
    }
  }, {
    key: 'renderDefaultInput',
    value: function renderDefaultInput() {
      var _props2 = this.props,
          classNames = _props2.classNames,
          placeholder = _props2.placeholder,
          styles = _props2.styles,
          value = _props2.value,
          autoFocus = _props2.autoFocus;

      return _react2.default.createElement('input', {
        type: 'text',
        placeholder: placeholder,
        className: classNames.input || '',
        value: value,
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown,
        style: styles.input,
        autoFocus: autoFocus
      });
    }

    // TODO: remove `classNames.container` in the next version release.

  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          classNames = _props3.classNames,
          children = _props3.children,
          styles = _props3.styles;

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, defaultStyles.root, styles.root),
          className: classNames.root || classNames.container || ''
        },
        this.renderLabel(),
        children ? this.renderCustomInput() : this.renderDefaultInput(),
        this.renderOverlay(),
        this.renderAutocomplete()
      );
    }
  }]);

  return PlacesAutocomplete;
}(_react2.default.Component);

PlacesAutocomplete.propTypes = {
  children: _react2.default.PropTypes.element,
  value: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  onSelect: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  hideLabel: _react2.default.PropTypes.bool,
  autoFocus: _react2.default.PropTypes.bool,
  autocompleteItem: _react2.default.PropTypes.func,
  classNames: _react2.default.PropTypes.shape({
    root: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    input: _react2.default.PropTypes.string,
    autocompleteContainer: _react2.default.PropTypes.string
  }),
  styles: _react2.default.PropTypes.shape({
    root: _react2.default.PropTypes.object,
    label: _react2.default.PropTypes.object,
    input: _react2.default.PropTypes.object,
    autocompleteContainer: _react2.default.PropTypes.object,
    autocompleteItem: _react2.default.PropTypes.object,
    autocompleteItemActive: _react2.default.PropTypes.object
  }),
  options: _react2.default.PropTypes.shape({
    bounds: _react2.default.PropTypes.object,
    componentRestrictions: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object,
    offset: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
    radius: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
    types: _react2.default.PropTypes.array
  })
};

PlacesAutocomplete.defaultProps = {
  placeholder: 'Address',
  hideLabel: false,
  autoFocus: false,
  classNames: {},
  autocompleteItem: function autocompleteItem(_ref) {
    var suggestion = _ref.suggestion;
    return _react2.default.createElement(
      'div',
      null,
      suggestion
    );
  },
  styles: {},
  options: {}
};

exports.default = PlacesAutocomplete;
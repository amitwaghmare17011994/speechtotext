"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SpeechToText =
/*#__PURE__*/
function (_Component) {
  _inherits(SpeechToText, _Component);

  function SpeechToText() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, SpeechToText);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpeechToText)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      stopListening: false,
      notAllowed: false
    }, _this.load = function () {
      window.final_transcript = "";
      window.recognizing = false;
      window.ignore_onend = false;
      window.recognition = new window.webkitSpeechRecognition();
      window.recognition.continuous = true;
      window.recognition.interimResults = true;

      window.recognition.onstart = function () {
        window.recognizing = true;
      };

      window.recognition.onerror = function (event) {
        window.caller.onError();

        if (event.error == "no-speech") {
          console.error("ERRROR", event.error);
          window.ignore_onend = true;
        }

        if (event.error == "audio-capture") {
          console.error("ERRROR", event.error);
          window.ignore_onend = true;
        }

        if (event.error == "not-allowed") {
          alert("Permission to use microphone is blocked");
          window.ignore_onend = true;
        }
      };

      window.recognition.onend = function () {
        window.recognizing = false;
        window.final_transcript = "";

        if (window.ignore_onend) {
          return;
        }
      };

      window.recognition.onresult = function (event) {
        var interim_transcript = "";

        if (typeof event.results == "undefined") {
          window.recognition.onend = null;
          window.recognition.stop();
          return;
        }

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            window.final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        window.final_transcript = capitalize(window.final_transcript);
        if (window.caller) window.caller.onSpeechEnd(linebreak(window.final_transcript + interim_transcript));
      };
    }, _this.forceStop = function () {
      window.recognition.stop();
      window.caller = null;
      window.final_transcript = "";
      window.ignore_onend = false;
    }, _this.startListening = function (callingObject, defaultText) {
      try {
        if (window.recognizing) {
          window.recognition.stop();
          window.recognizing = false;
          return;
        }

        window.recognition.lang = "en-AU";
        window.recognition.start();
        window.caller = callingObject;
        window.final_transcript = defaultText + "  ";
        window.ignore_onend = false;
      } catch (err) {
        window.recognition.stop();
        setTimeout(function () {
          window.recognition.lang = "en-AU";
          window.recognition.start();
          window.caller = callingObject;
          window.final_transcript = defaultText + "  ";
          window.ignore_onend = false;
        }, 300);
      }
    }, _this.onSpeechEnd = function (txt) {
      var onListen = _this.props.onListen;
      onListen(txt);
    }, _this.onError = function () {
      _this.setState({
        stopListening: true
      });
    }, _temp));
  }

  _createClass(SpeechToText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(pp, ps) {
      var _this$props = this.props,
          start = _this$props.start,
          _this$props$defaultTe = _this$props.defaultText,
          defaultText = _this$props$defaultTe === void 0 ? "" : _this$props$defaultTe;
      var stopListening = this.state.stopListening;

      if (ps.stopListening !== stopListening) {
        if (stopListening) {
          this.forceStop();
        }
      }

      if (pp && start !== pp.start) {
        if (start) {
          this.startListening(this, defaultText);
          if (stopListening) this.setState({
            stopListening: false
          });
        } else {
          this.forceStop();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          start = _this$props2.start,
          style = _this$props2.style,
          className = _this$props2.className;
      var _this$state = this.state,
          stopListening = _this$state.stopListening,
          notAllowed = _this$state.notAllowed;
      return _react.default.createElement(_react.default.Fragment, null, notAllowed ? _react.default.createElement("h2", null, "Not Allowed By Browser") : _react.default.createElement("div", _defineProperty({
        className: "speechToText",
        style: _objectSpread({
          cursor: "pointer",
          border: "1px solid  '#65c665'  ",
          padding: "0px 4px ",
          minWidth: 128,
          borderRadius: 2,
          textAlign: "left",
          color: start && !stopListening && "#65c665",
          height: 22,
          display: "flex",
          lineHeight: "1.8"
        }, style)
      }, "className", start && !stopListening ? "blink" : className), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faMicrophone
      }), _react.default.createElement("span", {
        className: "speechToText",
        style: {
          marginLeft: 7,
          color: "#65c665"
        }
      })));
    }
  }]);

  return SpeechToText;
}(_react.Component);

exports.default = SpeechToText;
var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
  return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
}

var first_char = /\S/;

function capitalize(s) {
  return s.replace(first_char, function (m) {
    return m.toUpperCase();
  });
}

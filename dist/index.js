(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Dialog = function Dialog(dialog, close) {
        _classCallCheck(this, Dialog);

        this.dialog = dialog;
        this.close = close;
        this.focusedElBeforeOpen = undefined;
        var focusableEls = this.dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        this.focusableEls = Array.prototype.slice.call(focusableEls);
        this.firstFocusableEl = this.focusableEls[0];
        this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
        var _Dialog = this;
        this.focusedElBeforeOpen = document.activeElement;
        this.dialog.addEventListener('keydown', function (e) {
            _Dialog._handleKeyDown(e);
        });
        this.firstFocusableEl && this.firstFocusableEl.focus();
    };

    Dialog.prototype._handleKeyDown = function (e) {

        var Dialog = this;
        var KEY_TAB = 9;
        var KEY_ESC = 27;

        function handleBackwardTab() {
            if (document.activeElement === Dialog.firstFocusableEl) {
                e.preventDefault();
                Dialog.lastFocusableEl.focus();
            }
        }
        function handleForwardTab() {
            if (document.activeElement === Dialog.lastFocusableEl) {
                e.preventDefault();
                Dialog.firstFocusableEl.focus();
            }
        }

        switch (e.keyCode) {
            case KEY_TAB:
                if (Dialog.focusableEls.length === 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    handleBackwardTab();
                } else {
                    handleForwardTab();
                }
                break;
            case KEY_ESC:
                Dialog.close();
                break;
            default:
                break;
        }
    };

    var inModal = function inModal(WrappedComponent) {
        var inModal = function (_Component) {
            _inherits(inModal, _Component);

            function inModal() {
                _classCallCheck(this, inModal);

                return _possibleConstructorReturn(this, (inModal.__proto__ || Object.getPrototypeOf(inModal)).apply(this, arguments));
            }

            _createClass(inModal, [{
                key: 'close',
                value: function close() {
                    this.props.close && this.props.close();
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    new Dialog(document.querySelector('#vageez-dialog'), this.props.close);
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var node = document.createElement('div');
                    node.setAttribute('id', 'react-in-modal');
                    document.getElementsByTagName('body')[0].appendChild(node);

                    return (0, _reactDom.createPortal)(_react2.default.createElement(
                        'div',
                        { id: 'react-in-modal-overlay', style: this.props.style.dialogOverlayStyle, onClick: function onClick() {
                                return _this2.close();
                            } },
                        _react2.default.createElement(
                            'div',
                            { id: 'react-in-modal-dialog', style: this.props.style.dialogStyle, role: 'dialog', 'aria-labelledby': this.props.aria.labelledBy, 'aria-describedby': this.props.aria.describedBy },
                            _react2.default.createElement(WrappedComponent, null)
                        )
                    ), document.querySelector('#react-in-modal'));
                }
            }]);

            return inModal;
        }(_react.Component);

        return inModal;
    };

    exports.default = inModal;
});
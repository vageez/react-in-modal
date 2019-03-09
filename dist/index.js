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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
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

    var Dialog = function Dialog(dialog, close) {

        var allFocusableEls = dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        var focusableEls = Array.prototype.slice.call(allFocusableEls);
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        dialog.addEventListener('keydown', function (e) {
            handleKeyDown(e, firstFocusableEl, lastFocusableEl, focusableEls, close);
        });

        firstFocusableEl && firstFocusableEl.focus();

        var handleKeyDown = function handleKeyDown(e, firstFocusableEl, lastFocusableEl, focusableEls, close) {
            var KEY_TAB = 9;
            var KEY_ESC = 27;

            var handleBackwardTab = function handleBackwardTab() {
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            };
            var handleForwardTab = function handleForwardTab() {
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            };

            switch (e.keyCode) {
                case KEY_TAB:
                    if (focusableEls.length === 1) {
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
                    close();
                    break;
                default:
                    break;
            }
        };
    };

    var InModal = function InModal(WrappedComponent) {
        var InModal = function (_Component) {
            _inherits(InModal, _Component);

            function InModal() {
                _classCallCheck(this, InModal);

                return _possibleConstructorReturn(this, (InModal.__proto__ || Object.getPrototypeOf(InModal)).apply(this, arguments));
            }

            _createClass(InModal, [{
                key: 'close',
                value: function close() {
                    this.props.close && this.props.close();
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    Dialog(document.querySelector('#react-in-modal'), this.props.close);
                }
            }, {
                key: 'render',
                value: function render() {
                    var _props = this.props,
                        close = _props.close,
                        style = _props.style,
                        aria = _props.aria;

                    var node = document.createElement('div');
                    node.setAttribute('id', 'react-in-modal-root');
                    node.setAttribute('style', 'position: relative; z-index: 2147483647;');
                    document.getElementsByTagName('body')[0].appendChild(node);

                    return (0, _reactDom.createPortal)(_react2.default.createElement(
                        'div',
                        { id: 'react-in-modal-overlay', style: style.modalOverlay, onClick: function onClick() {
                                return close();
                            } },
                        _react2.default.createElement(
                            'div',
                            { id: 'react-in-modal', style: style.modal, role: 'dialog', 'aria-labelledby': aria.labelledBy, 'aria-describedby': aria.describedBy },
                            _react2.default.createElement(WrappedComponent, null)
                        )
                    ), document.querySelector('#react-in-modal-root'));
                }
            }]);

            return InModal;
        }(_react.Component);

        return InModal;
    };

    exports.default = InModal;
});
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

class Dialog {
    constructor(dialog, close) {
        this.dialog = dialog;
        this.close = close;
        this.focusedElBeforeOpen = undefined;
        var focusableEls = this.dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        this.focusableEls = Array.prototype.slice.call(focusableEls);
        this.firstFocusableEl = this.focusableEls[0];
        this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
        var Dialog = this;
        this.focusedElBeforeOpen = document.activeElement;
        this.dialog.addEventListener('keydown', function (e) {
            Dialog._handleKeyDown(e);
        });
        this.firstFocusableEl && this.firstFocusableEl.focus();
    }
}

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

const inModal = WrappedComponent => {
    class inModal extends Component {
        close() {
            this.props.close && this.props.close()
        }        
        componentDidMount() {
            new Dialog(document.querySelector('#vageez-dialog'), this.props.close)
        }
        render() {

            const node = document.createElement('div')
            node.setAttribute('id', 'react-in-modal')
            document.getElementsByTagName('body')[0].appendChild(node)

            return createPortal(
                <div id="react-in-modal-overlay" style={this.props.style.dialogOverlayStyle} onClick={() => this.close()}>
                    <div id="react-in-modal-dialog" style={this.props.style.dialogStyle} role="dialog" aria-labelledby={this.props.aria.labelledBy} aria-describedby={this.props.aria.describedBy}>
                        <WrappedComponent />
                    </div>
                </div>,
                document.querySelector('#react-in-modal'))
        }
    }

    return inModal
}

export default inModal;

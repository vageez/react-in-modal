import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const config = {
    style: {
        dialogOverlayStyle: {
            zIndex: 2,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        dialogStyle: {
            zIndex: 3,
            width: '80%',
            margin: '0 auto',
            backgroundColor: 'white',
        }
    },
    aria: {
        labelledBy: 'dialog-title',
        describedBy: 'dialog-description'
    }
}

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

const inModal = config => WrappedComponent => {
    class inModal extends Component {
        close() {
            config.close && config.close()
        }        
        componentDidMount() {
            new Dialog(document.querySelector('#react-in-modal-dialog'), this.close)
        }
        render() {

            const node = document.createElement('div')
            node.setAttribute('id', 'react-in-modal')
            document.getElementsByTagName('body')[0].appendChild(node)

            return createPortal(
                <div id="react-in-modal-overlay" style={config.style.dialogOverlayStyle} onClick={() => this.close()}>
                    <div id="react-in-modal-dialog" style={config.style.dialogStyle} role="dialog" aria-labelledby={config.aria.labelledBy} aria-describedby={config.aria.describedBy}>
                        <WrappedComponent />
                    </div>
                </div>,
                document.querySelector('#react-in-modal'))
        }
    }

    return inModal
}

export default inModal;

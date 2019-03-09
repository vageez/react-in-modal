import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const Dialog = (dialog, close) => {
    
    const allFocusableEls = dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')
    const focusableEls = Array.prototype.slice.call(allFocusableEls)
    const firstFocusableEl = focusableEls[0]
    const lastFocusableEl = focusableEls[focusableEls.length - 1]
    dialog.addEventListener('keydown', function (e) {
        handleKeyDown(e, firstFocusableEl, lastFocusableEl, focusableEls, close)
    });

    firstFocusableEl && firstFocusableEl.focus()

    const handleKeyDown = (e, firstFocusableEl, lastFocusableEl, focusableEls, close) => {
        const KEY_TAB = 9
        const KEY_ESC = 27

        const handleBackwardTab = () => {
            if (document.activeElement === firstFocusableEl) {
                e.preventDefault();
                lastFocusableEl.focus();
            }
        }
        const handleForwardTab = () => {
            if (document.activeElement === lastFocusableEl) {
                e.preventDefault();
                firstFocusableEl.focus();
            }
        }

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
    }
}

const InModal = WrappedComponent => {
    class InModal extends Component {
        close() {
            this.props.close && this.props.close()
        }
        componentDidMount() {
            Dialog(document.querySelector('#react-in-modal'), this.props.close)
        }
        render() {
            
            const { close , style, aria } = this.props
            const node = document.createElement('div')
            node.setAttribute('id', 'react-in-modal-root')
            node.setAttribute('style', 'position: relative; z-index: 2147483647;')
            document.getElementsByTagName('body')[0].appendChild(node)

            return createPortal(
                <div id="react-in-modal-overlay" style={style.modalOverlay} onClick={() => close()}>
                    <div id="react-in-modal" style={style.modal} role="dialog" aria-labelledby={aria.labelledBy} aria-describedby={aria.describedBy}>
                        <WrappedComponent />
                    </div>
                </div>,
                document.querySelector('#react-in-modal-root'))
        }
    }

    return InModal
}


export default InModal;
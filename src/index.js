import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

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

class InModal extends Component {
    componentDidMount() {
        Dialog(document.querySelector('#react-in-modal'), this.props.onClose)
    }
    render() {
        const { onClose, modalStyle, overlayStyle, ariaLabelledBy, ariaDescribedBy, children } = this.props
        const modalRoot = document.createElement('div')
        modalRoot.setAttribute('id', 'react-in-modal-root')
        modalRoot.setAttribute('style', 'position: relative; z-index: 2147483647;');
        document.getElementsByTagName('body')[0].appendChild(modalRoot)
        return createPortal(
            <div
                id='react-in-modal-overlay'
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', ...overlayStyle }}
                onClick={() => onClose()}>
                <div
                    id='react-in-modal'
                    style={{ margin: '0 auto', ...modalStyle }}
                    role='dialog'
                    onClick={e => e.stopPropagation()}
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}>
                    {children}
                </div>
            </div>, document.querySelector('#react-in-modal-root'))
    }
}

InModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    ariaLabelledBy: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default InModal;
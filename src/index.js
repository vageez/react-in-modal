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
        const { onClose, modal, dimmer, ModalComponent, children } = this.props

        var elementExists = document.getElementById('react-in-modal-root');
        if (!elementExists) {
            const modalRoot = document.createElement('div')
            modalRoot.setAttribute('id', 'react-in-modal-root')
            modalRoot.setAttribute('style', 'position: relative; z-index: 2147483647;');
            document.getElementsByTagName('body')[0].appendChild(modalRoot)
        }
        const Modal = ModalComponent ?
            <ModalComponent
                {...modal}
                id='react-in-modal'
                role='dialog'
                onClick={e => e.stopPropagation()}>
                {children}
            </ModalComponent>
            :
            <div
                {...modal}
                id='react-in-modal'
                role='dialog'
                onClick={e => e.stopPropagation()}>
                {children}
            </div>

        return createPortal(
            <div
                id='react-in-modal-overlay'
                {...dimmer}
                onClick={() => onClose()}>
                {Modal}
            </div>, document.querySelector('#react-in-modal-root'))
    }
}

InModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modal: PropTypes.object,
    dimmer: PropTypes.object,
    ariaLabelledBy: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
    ModalComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default InModal;
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from './index'

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }

  const close = (e) => {
    if (onClose) {
      onClose(e)
    }
  }
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          {closable && <Button onClick={close}>Close</Button>}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #03658C;
  border-radius: 10px;
  width: 80%;
  max-width: 1600px;
  height: 80%;
  max-height: 1000px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 12px 24px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`


export default Modal;
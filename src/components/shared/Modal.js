import React from 'react'
import styled, { css } from 'styled-components'
import Modal from 'react-modal'
import { noop } from 'lodash'

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 20px;
`

const Title = styled.div`
  font-weight: 700;
`

/*
|--------------------------------------------------------------------------
| modal styles
|--------------------------------------------------------------------------
*/

const modalStyles = {
  content: {
    left: '50%',
    right: 'auto',
    marginRight: '-50%',
    transform: 'translateX(-50%)',
    overflow: 'scroll',
    width: '540px',
    maxWidth: '90vw',
    marginBottom: '40px',
    height: 'fit-content',
    padding: '0',
  },
}

/*
|--------------------------------------------------------------------------
| Modal Component
|--------------------------------------------------------------------------
*/

export default class _Modal extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const shadedBackground = document.querySelector('.ReactModal__Overlay')
      if (!shadedBackground) return
      shadedBackground.addEventListener('click', this._closeModalOnClickOutside)
    }, 400)
  }

  componentWillUnmount() {
    const shadedBackground = document.querySelector('.ReactModal__Overlay')
    if (!shadedBackground) return
    shadedBackground.removeEventListener(
      'click',
      this._closeModalOnClickOutside,
    )
  }

  _closeModalOnClickOutside = e => {
    const { closeOnOutsideClick = true } = this.props
    if (!closeOnOutsideClick) return
    if (
      e.target.classList.value ===
      'ReactModal__Overlay ReactModal__Overlay--after-open'
    ) {
      const { closeModal = noop } = this.props
      closeModal()
    }
  }

  render() {
    const {
      isOpen,
      contentLabel,
      children,
      style = {},
      closeModal = noop,
      title = 'Modal Title',
      withPadding = true,
    } = this.props
    return (
      <Modal
        isOpen={isOpen}
        contentLabel={contentLabel}
        style={{ ...modalStyles, ...style }}
      >
        <HeaderContainer>
          <div>
            <Title>{title}</Title>
          </div>
          <div>
            <i
              className='fal fa-times'
              style={{ cursor: 'pointer' }}
              onClick={closeModal}
            ></i>
          </div>
        </HeaderContainer>
        {children}
      </Modal>
    )
  }
}

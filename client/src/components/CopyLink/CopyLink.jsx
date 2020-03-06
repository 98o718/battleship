import React, { useState } from 'react'
import {
  CopyLinkWrapper,
  Text,
  Container,
  GlobalStyle,
  Input,
} from './CopyLink.styles'
import { Button } from '..'
import { Global } from '@emotion/core'
import Modal from 'react-modal'
const CopyLink = props => {
  const [copyStyle, setCopyStyle] = useState('common')
  const [copyText, setCopyText] = useState('Скопировать')

  const Copy = () => {
    var copyText = document.getElementById('copyInput')
    copyText.select()
    document.execCommand('copy')
    setCopyStyle('ready')
    setCopyText('Скопировано')
  }
  return (
    <CopyLinkWrapper>
      {' '}
      <Global styles={GlobalStyle(props.isOpen)} />
      <Modal
        isOpen={props.isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => props.setIsOpen(false)}
        contentLabel="Example Modal"
        overlayClassName="model-overlay-copy-link"
        className="model-class-copy-link"
        closeTimeoutMS={500}
      >
        <Container isOpen={props.isOpen}>
          <Text>Отправьте эту ссылку другу</Text>
          <Input value={window.location.href} id="copyInput" />
          <Button
            onClick={Copy}
            text={copyText}
            state={copyStyle}
            style={{ margin: 15, width: 'auto' }}
          />
        </Container>
      </Modal>
    </CopyLinkWrapper>
  )
}

export default CopyLink

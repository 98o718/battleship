import React from 'react'
import {
  GiveUpWrapper,
  Container,
  GlobalStyle,
  Image,
  Text,
} from './GiveUp.styles'
import { Button } from '..'
import { Global } from '@emotion/core'
import Modal from 'react-modal'

import skull from '../../assets/skull.png'

const GiveUp = props => {
  return (
    <GiveUpWrapper>
      <Global styles={GlobalStyle(props.isOpen)} />
      <Modal
        isOpen={props.isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => props.setIsOpen(false)}
        contentLabel="Example Modal"
        overlayClassName="model-overlay"
        className="model-class"
        closeTimeoutMS={500}
      >
        <Container isOpen={props.isOpen}>
          <Image src={skull} alt="skull" />
          <Text>
            Вы действительно хотите сдаться?
            <br />
            При игре на рейтинг, Вам будет засчитан проигрыш
          </Text>
          <Button
            onClick={() => props.setIsOpen(false)}
            text="Продолжить игру"
            state="ready"
            style={{ margin: 15, width: 'auto' }}
          />
          <Button
            onClick={() => {
              props.handleGiveUp()
              props.setIsOpen(false)
            }}
            text="Сдаться"
            state="giveUp"
            style={{ margin: 15 }}
          />
        </Container>
      </Modal>
    </GiveUpWrapper>
  )
}
export default GiveUp
